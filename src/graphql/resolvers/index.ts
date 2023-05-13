import agencyMutation from "./agency/mutation";
import agencyQuery from "./agency/queries";
import clientMutation from "./client/mutation";
import userMutation from "./user/mutation";
import userQuery from "./user/queries";

const resolvers = {
  Mutation: {
    ...userMutation,
    ...agencyMutation,
    ...clientMutation,
  },
  Query: {
    ...userQuery,
    ...agencyQuery,
    ...agencyQuery,
  },
};
export default resolvers;
