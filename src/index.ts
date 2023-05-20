import dotenv from "dotenv";
import isAuth from "./middleware/is-auth";
import { ApolloServer } from "@apollo/server";
import jwt from "jsonwebtoken";
import resolvers from "./graphql/resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "graphql-import-files";
import { UserDataSource } from "./datasources/user-datasource";
import User from "./models/user-model";

import connectDB from "./utils/connection";
import { IDataSources } from "./types/datasource";
import { AgencyDataSource } from "./datasources/agency-datasource";
import Agency from "./models/agency-model";
import logger from "./utils/logger";
import { ClientDataSource } from "./datasources/client-datasources";
import Client from "./models/client-model";
import Alert from "./models/alert-model";
import { AlertDataSource } from "./datasources/alert-datasource";
import Connection from "./models/connection-model";
import { ConnectionDataSource } from "./datasources/connection-datasource";
import { campaignDataSource } from "./datasources/campaign-datasource";
import campaign from "./models/campaign-model";
import { AdvertisementDataSource } from "./datasources/advertisement-datasource";
import Advertisement from "./models/advertisement-model";
import Spending from "./models/spending-model";
import { SpendingDataSource } from "./datasources/spending-datasources";
import { ImpressionDataSource } from "./datasources/impression-datasource";
import Impression from "./models/impression-model";
import { RevenueDataSource } from "./datasources/revenue-datasource";
import Revenue from "./models/revenue-model";
import { verifyJWT } from "./utils/AuthUtils";

dotenv.config();
const PORT: number = (process.env.PORT as unknown as number) || 7000;
connectDB()
  .then(() => {
    logger.info("Database connected");
  })
  .catch((err) => {
    logger.error(err);
  });

interface MyContext {
  token?: string;
  dataSources: IDataSources;
}
const server = new ApolloServer<MyContext>({
  typeDefs: loadFiles("**/typeDefs/*.{graphql,gql}"),
  resolvers,
});

// data sources

startStandaloneServer(server, {
  context: async ({ req }) => {
    const dataSources = {
      user: new UserDataSource({ User }),
      agency: new AgencyDataSource({ Agency }),
      client: new ClientDataSource({ Client }),
      alert: new AlertDataSource({ Alert }),
      connections: new ConnectionDataSource({ Connection }),
      campaigns: new campaignDataSource({ campaign }),
      advertisement: new AdvertisementDataSource({ Advertisement }),
      spending: new SpendingDataSource({ Spending }),
      impression: new ImpressionDataSource({ Impression }),
      revenue: new RevenueDataSource({ Revenue }),
    };
    // const data = await verifyJWT(req.headers.authorization);
    // console.log(data);
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources,
      token: (req.headers["api-key"] as string) || "",
      authToken: req.headers.authorization || "",
    };
  },
  listen: { port: PORT },
})
  .then(({ url }) => {
    logger.info(`🚀  Server ready at ${url}`);
  })
  .catch((err) => {
    logger.info(err);
  });
