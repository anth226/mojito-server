import advertisementMutation from "./advertisement/mutation";
import advertisementQuery from "./advertisement/queries";
import agencyMutation from "./agency/mutation";
import agencyQuery from "./agency/queries";
import alertMutation from "./alert/mutation";
import alertQuery from "./alert/queries";
import clientMutation from "./client/mutation";
import clientQuery from "./client/queries";
import campaignMutation from "./campaign/mutation";
import campaignQuery from "./campaign/queries";
import connectionMutation from "./connection/mutation";
import connectionQuery from "./connection/queries";
import userMutation from "./user/mutation";
import userQuery from "./user/queries";
import SpendingQuery from "./spending/queries";
import spendingMutation from "./spending/mutation";
import impressionMutation from "./impression/mutation";
import ImpressionQuery from "./impression/queries";
import revenueMutation from "./revenue/mutation";
import revenueQuery from "./revenue/queries";

const resolvers = {
  Mutation: {
    ...userMutation,
    ...agencyMutation,
    ...clientMutation,
    ...alertMutation,
    ...connectionMutation,
    ...campaignMutation,
    ...advertisementMutation,
    ...spendingMutation,
    ...impressionMutation,
    ...revenueMutation,
  },
  Query: {
    ...userQuery,
    ...agencyQuery,
    ...agencyQuery,
    ...alertQuery,
    ...clientQuery,
    ...connectionQuery,
    ...campaignQuery,
    ...advertisementQuery,
    ...SpendingQuery,
    ...ImpressionQuery,
    ...revenueQuery,
  },
};
export default resolvers;
