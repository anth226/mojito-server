import dotenv from "dotenv";
import isAuth from "./middleware/is-auth";
import { ApolloServer } from "@apollo/server";
import jwt from "jsonwebtoken";
import resolvers from "./graphql/resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "graphql-import-files";
import UserAPI from "./datasources/user-datasources";
//  * INTIALIZE  DOTENV TO LOAD VARIABLES FROM .ENV fILE
dotenv.config();

//  * CREATE PORT VARIABLE FROM .ENV FILE
const PORT: number = (process.env.PORT as unknown as number) || 7000;

// * CONNECT TO DATA SERVICE

//  * MIDDLEWARE

//  * SETTING UP GRAPHQL
interface MyContext {
  token?: string;
}
const server = new ApolloServer<MyContext>({
  typeDefs: loadFiles("**/typeDefs/*.{graphql,gql}"),
  resolvers,
});

startStandaloneServer(server, {
  context: async ({ req, res }) => {
    const { cache } = server;
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      datasource: {
        userAPI: new UserAPI({ cache }),
      },

      token: req.headers.token,
    };
  },
  listen: { port: PORT },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
