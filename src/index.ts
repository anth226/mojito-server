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
import { GraphQLError } from "graphql"
import * as handlers from "./rest"
import { OAuth2Factory } from "./core/oauth2"

dotenv.config()

const config = {
    port: parseInt(process.env.PORT || "7000"),
    databaseUrl: process.env.DATABASE_URL as string,
    authPrivateKey: process.env.AUTH_PRIVATE_KEY as string,
    googleClientId: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    metaClientId: process.env.META_CLIENT_ID as string,
    metaClientSecret: process.env.META_CLIENT_SECRET as string,
    tiktokClientId: process.env.TIKTOK_CLIENT_ID as string,
    tiktokClientSecret: process.env.TIKTOK_CLIENT_SECRET as string,
}

const restServer = express()

const gqlServer = new ApolloServer<types.RequestContext>({
    typeDefs: loadFiles("**/graphql/schema.graphql"),
    resolvers: resolvers,
})

async function startServers(): Promise<void> {
    try {
        await datasources.connectIfNecessary(config.databaseUrl)
        await gqlServer.start()

        restServer.use(
            "/gql",
            cors({ origin: "*" }),
            json(),
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
                            authFactory: new OAuth2Factory({
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
                            }),
                        },
                        authPrivateKey: config.authPrivateKey,
                        datasources: {
                            user: new datasources.UserDatasource(),
                            agency: new datasources.AgencyDatasource(),
                            connection: new datasources.ConnectionDatasource(),
                            business: new datasources.BusinessDatasource(),
                            alert: new datasources.AlertDatasource(),
                        },
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
                            throw new GraphQLError(
                                "Invalid access token signature",
                                {
                                    extensions: {
                                        http: {
                                            status: 401,
                                        },
                                    },
                                }
                            )
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
                    authFactory: new OAuth2Factory({
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
                    }),
                }
                req.datasources = {
                    user: new datasources.UserDatasource(),
                    agency: new datasources.AgencyDatasource(),
                    connection: new datasources.ConnectionDatasource(),
                    business: new datasources.BusinessDatasource(),
                    alert: new datasources.AlertDatasource(),
                }

                next()
            }
        )

        restServer.get("/health", handlers.health)
        restServer.get("/auth/google", handlers.googleCallback)
        restServer.get("/auth/meta", handlers.metaCallback)
        restServer.get("/meta/test", handlers.testFacebookCalls)

        restServer.listen(config.port, "0.0.0.0", () => {
            logger.info(`🚀  Server ready at port ${config.port}`)
        })
    } catch (error) {
        logger.info(error)
    }
}

startServers()
