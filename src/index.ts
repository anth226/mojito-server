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
import { IDataSources, IUserDataSource } from "./types/datasource";
import { AgencyDataSource } from "./datasources/agency-datasource";
import Agency from "./models/agency-model";
import logger from "./utils/logger";
import { ClientDataSource } from "./datasources/client-datasources";
import Client from "./models/client-model";
import Alert from "./models/alert-model";
import { AlertDataSource } from "./datasources/alert-datasource";
import Connection from "./models/connection-model";
import { ConnectionDataSource } from "./datasources/connection-datasource";

dotenv.config();
const PORT: number = (process.env.PORT as unknown as number) || 7000;

interface MyContext {
  token?: string;
  dataSources: IDataSources;
}
const server = new ApolloServer<MyContext>({
  typeDefs: loadFiles("**/typeDefs/*.{graphql,gql}"),
  resolvers,
});
connectDB()
  .then(() => {
    logger.info("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    server.stop();
  });

// data sources

startStandaloneServer(server, {
  context: async ({ req }) => {
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        user: new UserDataSource({ User }),
        agency: new AgencyDataSource({ Agency }),
        client: new ClientDataSource({ Client }),
        alert: new AlertDataSource({ Alert }),
        connections: new ConnectionDataSource({ Connection }),
      },
      token: req.headers.authorization || "",
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
