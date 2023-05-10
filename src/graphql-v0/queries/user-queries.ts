import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLInt } from "graphql";
import { ApolloError } from "apollo-server-errors";
import User from "../../models/user";
import { MESSAGES } from "../../constants";
import UserType from "../types/user-types";

const users = {
  type: new GraphQLList(UserType),
  resolve: (parent: any, args: any, req: { isAuth: any }) => {
    // * CHECK IF TOKEN IS VALID
    if (!req.isAuth) {
      throw new ApolloError(MESSAGES.NOT_AUTHENTICATED);
    }
    return User.find();
  },
};

const user = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve(parent: any, args: { id: any }, req: { isAuth: any }) {
    // * CHECK IF TOKEN IS VALID
    if (!req.isAuth) {
      throw new ApolloError(MESSAGES.NOT_AUTHENTICATED);
    }
    return User.findById(args.id);
  },
};

const usersCount = {
  type: GraphQLInt,
  resolve(parent: any, args: any) {
    return User.find().count();
  },
};

export { users, user, usersCount };
