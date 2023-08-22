import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { json } from "body-parser"
import express, { Request, Response, NextFunction } from "express"
import { loadFiles } from "graphql-import-files"
import * as datasources from "./datasources"
import * as auth from "./auth"
import * as types from "./types"
import cors from "cors"
import logger from "./utils/logger"
import { resolvers } from "./graphql/resolvers"
import * as handlers from "./rest"
import { OAuth2Factory } from "./core/oauth2"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import customParseFormat from "dayjs/plugin/customParseFormat"
import quarterOfYear from "dayjs/plugin/quarterOfYear"
import { AWS } from "./core/aws"
import NodeCache from "node-cache"

dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.extend(quarterOfYear)

dotenv.config()

const config = {
    port: parseInt(process.env.PORT || "7000"),
    databaseUrl: process.env.DATABASE_URL as string,
    authPrivateKey: process.env.AUTH_PRIVATE_KEY as string,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    awsDefaultBucket: process.env.AWS_BUCKET as string,
    awsRegion: process.env.AWS_REGION as string,
    googleClientId: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    metaClientId: process.env.META_CLIENT_ID as string,
    metaClientSecret: process.env.META_CLIENT_SECRET as string,
    tiktokClientId: process.env.TIKTOK_CLIENT_ID as string,
    tiktokClientSecret: process.env.TIKTOK_CLIENT_SECRET as string,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY as string,
}

const restServer = express()
const stripe = require('stripe')(config.stripeSecretKey);

const gqlServer = new ApolloServer<types.RequestContext>({
    typeDefs: loadFiles("**/graphql/schema.graphql"),
    resolvers: resolvers,
})

async function startServers(): Promise<void> {
    try {
        await datasources.connectIfNecessary(config.databaseUrl)
        await gqlServer.start()

        const cache = new NodeCache()
        const aws = new AWS(
            config.awsAccessKeyId,
            config.awsSecretAccessKey,
            config.awsRegion
        )
        const oauth2Factory = new OAuth2Factory({
            GOOGLE: {
                clientId: config.googleClientId,
                clientSecret: config.googleClientSecret,
            },
            META: {
                clientId: config.metaClientId,
                clientSecret: config.metaClientSecret,
            },
            TIKTOK: {
                clientId: config.tiktokClientId,
                clientSecret: config.tiktokClientId,
            },
        })

        restServer.use(
            "/gql",
            cors({ origin: "*" }),
            json({ limit: "5mb" }),
            expressMiddleware(gqlServer as any, {
                context: async ({ req }) => {
                    try {
                        await datasources.connectIfNecessary(config.databaseUrl)
                    } catch (error) {
                        logger.error(`Database connection failed: ${error}`)
                        throw new Error("An unexpected error occurred")
                    }

                    const context: types.RequestContext = {
                        core: {
                            aws,
                            authFactory: oauth2Factory,
                            stripe:stripe,
                        },
                        authPrivateKey: config.authPrivateKey,
                        defaultAwsBucket: config.awsDefaultBucket,
                        datasources: {
                            user: new datasources.UserDatasource(cache),
                            agency: new datasources.AgencyDatasource(cache),
                            connection: new datasources.ConnectionDatasource(
                                cache
                            ),
                            business: new datasources.BusinessDatasource(cache),
                            alert: new datasources.AlertDatasource(),
                            metric: new datasources.MetricDatasource(cache),
                            billing: new datasources.BillingDatasource(),
                            history: new datasources.BillingHistoryDatasource()
                        },
                        logger,
                    }

                    if (req.headers.authorization) {
                        const accessToken = req.headers.authorization.replace(
                            "Bearer ",
                            ""
                        )

                        const isTokenValid = await auth.isAccessTokenValid(
                            context.authPrivateKey,
                            accessToken
                        )

                        if (!isTokenValid) {
                            logger.info("Invalid access token signature")
                            return context
                        }

                        const jwtPayload = auth.decodeAccessToken(accessToken)
                        if (jwtPayload) {
                            context.user =
                                (await context.datasources.user.getById(
                                    jwtPayload?.userId
                                )) || undefined
                        }
                    }

                    return context
                },
            })
        )

        restServer.use(
            "/",
            async (req: Request, _res: Response, next: NextFunction) => {
                try {
                    await datasources.connectIfNecessary(config.databaseUrl)
                } catch (error) {
                    logger.error(`Database connection failed: ${error}`)
                    throw new Error("An unexpected error occurred")
                }

                req.core = {
                    aws,
                    authFactory: oauth2Factory,
                    stripe:stripe,
                }
                req.datasources = {
                    user: new datasources.UserDatasource(cache),
                    agency: new datasources.AgencyDatasource(cache),
                    connection: new datasources.ConnectionDatasource(cache),
                    business: new datasources.BusinessDatasource(cache),
                    alert: new datasources.AlertDatasource(),
                    metric: new datasources.MetricDatasource(cache),
                    billing: new datasources.BillingDatasource(),
                    history: new datasources.BillingHistoryDatasource()
                }
                req.logger = logger

                next()
            }
        )

        restServer.get("/health", handlers.health)
        restServer.get("/auth/google", handlers.googleCallback)
        restServer.get("/auth/meta", handlers.metaCallback)

        restServer.listen(config.port, "0.0.0.0", () => {
            logger.info(`🚀  Server ready at port ${config.port}`)
        })
    } catch (error) {
        logger.info(error)
    }
}

startServers()
