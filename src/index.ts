import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { loadFiles } from "graphql-import-files"
import { UserDatasource } from "./datasources/user-datasource"
import { AgencyDatasource } from "./datasources/agency-datasource"
import { connectIfNecessary } from "./datasources"

import { Datasources } from "./types/datasource"
import logger from "./utils/logger"
import { resolvers } from "./graphql/resolvers"

dotenv.config()

const PORT = parseInt(process.env.PORT || "7000")
const DATABASE_URL = process.env.DATABASE_URL as string

export interface RequestContext {
    token?: string
    datasources: Datasources
}

const server = new ApolloServer<RequestContext>({
    typeDefs: loadFiles("**/graphql/schema.graphql"),
    resolvers: resolvers,
})

async function startServer(): Promise<void> {
    try {
        await connectIfNecessary(DATABASE_URL)

        const { url } = await startStandaloneServer(server, {
            context: async ({ req }) => {
                try {
                    await connectIfNecessary(DATABASE_URL)
                } catch (error) {
                    logger.error(`Database connection failed: ${error}`)
                    throw new Error("An unexpected error occurred")
                }

                return {
                    // We create new instances of our data sources with each request,
                    // passing in our server's cache.
                    datasources: {
                        user: new UserDatasource(),
                        agency: new AgencyDatasource(),
                        // client: new ClientDataSource({ Client }),
                        // alert: new AlertDataSource({ Alert }),
                        // connections: new ConnectionDataSource({ Connection }),
                        // campaigns: new campaignDataSource({ campaign }),
                        // advertisement: new AdvertisementDataSource({
                        //     Advertisement,
                        // }),
                        // spending: new SpendingDataSource({ Spending }),
                        // impression: new ImpressionDataSource({ Impression }),
                        // revenue: new RevenueDataSource({ Revenue }),
                    },
                    token: req.headers.authorization || "",
                }
            },
            listen: { port: PORT },
        })

        logger.info(`🚀  Server ready at ${url}`)
    } catch (error) {
        logger.info(error)
    }
}

startServer()
