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
import { GoogleAuth } from "./core/google"

dotenv.config()

const config = {
    port: parseInt(process.env.PORT || "7000"),
    databaseUrl: process.env.DATABASE_URL as string,
    authPrivateKey: process.env.AUTH_PRIVATE_KEY as string,
    googleClientId: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
                            google: new GoogleAuth(
                                config.googleClientId,
                                config.googleClientSecret
                            ),
                        },
                        authPrivateKey: config.authPrivateKey,
                        datasources: {
                            user: new datasources.UserDatasource(),
                            agency: new datasources.AgencyDatasource(),
                            connection: new datasources.ConnectionDatasource(),
                            business: new datasources.BusinessDatasource(),
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
                    google: new GoogleAuth(
                        config.googleClientId,
                        config.googleClientSecret
                    ),
                }
                req.datasources = {
                    user: new datasources.UserDatasource(),
                    agency: new datasources.AgencyDatasource(),
                    connection: new datasources.ConnectionDatasource(),
                    business: new datasources.BusinessDatasource(),
                }

                next()
            }
        )

        restServer.get("/health", handlers.health)
        restServer.get("/auth/google", handlers.googleCallback)

        restServer.listen(config.port, "0.0.0.0", () => {
            logger.info(`🚀  Server ready at port ${config.port}`)
        })
    } catch (error) {
        logger.info(error)
    }
}

startServers()
