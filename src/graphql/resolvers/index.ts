import agencyMutation from "./agency/mutation";
import agencyQuery from "./agency/queries";
import alertMutation from "./alert/mutation";
import alertQuery from "./alert/queries";
import clientMutation from "./client/mutation";
import clientQuery from "./client/queries";
import connectionMutation from "./connection/mutation";
import connectionQuery from "./connection/queries";
import userMutation from "./user/mutation";
import userQuery from "./user/queries";

const resolvers = {
  Mutation: {
    ...userMutation,
    ...agencyMutation,
    ...clientMutation,
    ...alertMutation,
    ...connectionMutation,
  },
  Query: {
    ...userQuery,
    ...agencyQuery,
    ...agencyQuery,
    ...alertQuery,
    ...clientQuery,
    ...connectionQuery,
  },
};
export default resolvers;
