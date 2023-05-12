import agencyMutation from "./agency/mutation";
import agencyQuery from "./agency/queries";
import userMutation from "./user/mutation";
import userQuery from "./user/queries";

const resolvers = {
  Mutation: {
    ...userMutation,
    ...agencyMutation,
  },
  Query: {
    ...userQuery,
    ...agencyQuery,
  },
};
export default resolvers;
