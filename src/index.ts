import dotenv from "dotenv"
import { ApolloServer } from "@apollo/server"
import resolvers from "./graphql/resolvers"
import { startStandaloneServer } from "@apollo/server/standalone"
import { loadFiles } from "graphql-import-files"
import { UserDataSource } from "./datasources/user-datasource"
import User from "./models/user-model"
import { connectIfNecessary } from "./datasources"

import { IDataSources } from "./types/datasource"
import { AgencyDataSource } from "./datasources/agency-datasource"
import Agency from "./models/agency-model"
import logger from "./utils/logger"
import { ClientDataSource } from "./datasources/client-datasources"
import Client from "./models/client-model"
import Alert from "./models/alert-model"
import { AlertDataSource } from "./datasources/alert-datasource"
import Connection from "./models/connection-model"
import { ConnectionDataSource } from "./datasources/connection-datasource"
import { campaignDataSource } from "./datasources/campaign-datasource"
import campaign from "./models/campaign-model"
import { AdvertisementDataSource } from "./datasources/advertisement-datasource"
import Advertisement from "./models/advertisement-model"
import Spending from "./models/spending-model"
import { SpendingDataSource } from "./datasources/spending-datasources"
import { ImpressionDataSource } from "./datasources/impression-datasource"
import Impression from "./models/impression-model"
import { RevenueDataSource } from "./datasources/revenue-datasource"
import Revenue from "./models/revenue-model"

dotenv.config()

const PORT = parseInt(process.env.PORT || "7000")
const DATABASE_URL = process.env.DATABASE_URL as string

interface RequestContext {
    token?: string
    dataSources: IDataSources
}

const server = new ApolloServer<RequestContext>({
    typeDefs: loadFiles("**/typeDefs/*.{graphql,gql}"),
    resolvers,
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
                    dataSources: {
                        user: new UserDataSource({ User }),
                        agency: new AgencyDataSource({ Agency }),
                        client: new ClientDataSource({ Client }),
                        alert: new AlertDataSource({ Alert }),
                        connections: new ConnectionDataSource({ Connection }),
                        campaigns: new campaignDataSource({ campaign }),
                        advertisement: new AdvertisementDataSource({
                            Advertisement,
                        }),
                        spending: new SpendingDataSource({ Spending }),
                        impression: new ImpressionDataSource({ Impression }),
                        revenue: new RevenueDataSource({ Revenue }),
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
