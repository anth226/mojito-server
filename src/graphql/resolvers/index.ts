import * as gql from "../__generated__/resolvers-types"
import * as users from "./user"
import * as agencies from "./agency"
import * as businesses from "./business"
import * as connections from "./connection"
import * as alerts from "./alert"

const query: gql.QueryResolvers = {
    user: users.getUserById,
    viewer: users.getCurrentUser,
    clients: users.getClients,
    members: users.getMembers,
    connections: connections.getConnections,
    alerts: alerts.getAlerts,
}

const mutation: gql.MutationResolvers = {
    registerAgency: users.registerUserForAgency,
    updateAgency: agencies.updateAgency,
    registerBusiness: users.registerUserForBusiness,
    updateBusiness: businesses.updateBusiness,
    login: users.loginUser,
    inviteClients: users.inviteClients,
    inviteMembers: users.inviteMembers,
    createConnection: connections.createConnection,
    updateConnection: connections.updateConnection,
    syncConnection: connections.syncConnection,
    deleteConnection: connections.deleteConnection,
    createAlerts: alerts.createAlerts,
    updateAlert: alerts.updateAlert,
    archiveAlert: alerts.archiveAlert,
}

const user: gql.UserResolvers = {
    agency: agencies.getAgencyFromUser,
    business: businesses.getBusinessFromUser,
}

const agency: gql.AgencyResolvers = {
    clients: users.getClientsFromAgency,
    members: users.getMembersFromAgency,
    connections: connections.getConnectionsFromAgency,
    alerts: alerts.getAlertsFromAgency,
}

const business: gql.BusinessResolvers = {
    members: users.getMembersFromBusiness,
    connections: connections.getConnectionsFromBusiness,
}

const connection: gql.ConnectionResolvers = {
    client: users.getClientFromConnection,
}

const alert: gql.AlertResolvers = {
    clients: users.getClientsFromAlert,
}

export const resolvers: gql.Resolvers = {
    Query: query,
    Mutation: mutation,
    User: user,
    Agency: agency,
    Business: business,
    Connection: connection,
    Alert: alert,
}
