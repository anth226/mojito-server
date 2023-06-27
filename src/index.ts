import dotenv from "dotenv"
import { ApolloServer, BaseContext } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { json } from "body-parser"
import express from "express"
import { startStandaloneServer } from "@apollo/server/standalone"
import { loadFiles } from "graphql-import-files"
import * as datasources from "./datasources"
import * as auth from "./auth"
import * as types from "./types"
import cors from "cors"

import logger from "./utils/logger"
import { resolvers } from "./graphql/resolvers"
import { GraphQLError } from "graphql"

dotenv.config()

const PORT = parseInt(process.env.PORT || "7000")
const DATABASE_URL = process.env.DATABASE_URL as string
const AUTH_PRIVATE_KEY = process.env.AUTH_PRIVATE_KEY as string

const restServer = express()

const gqlServer = new ApolloServer<types.RequestContext>({
    typeDefs: loadFiles("**/graphql/schema.graphql"),
    resolvers: resolvers,
})

async function startServers(): Promise<void> {
    try {
        await datasources.connectIfNecessary(DATABASE_URL)
        await gqlServer.start()

        restServer.use(
            "/gql",
            cors({ origin: "*" }),
            json(),
            expressMiddleware(gqlServer as any, {
                context: async ({ req }) => {
                    try {
                        await datasources.connectIfNecessary(DATABASE_URL)
                    } catch (error) {
                        logger.error(`Database connection failed: ${error}`)
                        throw new Error("An unexpected error occurred")
                    }

                    const context: types.RequestContext = {
                        authPrivateKey: AUTH_PRIVATE_KEY,
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

        restServer.get("/", (req, res) => {
            res.send("OK")
        })

        restServer.listen(PORT, "0.0.0.0", () => {
            logger.info(`🚀  Server ready at port ${PORT}`)
        })
    } catch (error) {
        logger.info(error)
    }
}

startServers()
