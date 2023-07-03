import {
    AgencyResolvers,
    AlertResolvers,
    BusinessResolvers,
    ConnectionResolvers,
    MutationResolvers,
    QueryResolvers,
    Resolvers,
    UserResolvers,
} from "../__generated__/resolvers-types"

import * as users from "./user"
import * as agencies from "./agency"
import * as businesses from "./business"
import * as connections from "./connection"
import * as alerts from "./alert"

const query: QueryResolvers = {
    user: users.getUserById,
    viewer: users.getCurrentUser,
}

const mutation: MutationResolvers = {
    registerAgency: users.registerUserForAgency,
    registerBusiness: users.registerUserForBusiness,
    login: users.loginUser,
    inviteClients: users.inviteClients,
    inviteMembers: users.inviteMembers,
    createConnection: connections.createConnection,
    deleteConnection: connections.deleteConnection,
    createAlerts: alerts.createAlerts,
    archiveAlert: alerts.archiveAlert,
}

const user: UserResolvers = {
    agency: agencies.getAgencyFromUser,
    business: businesses.getBusinessFromUser,
}

const agency: AgencyResolvers = {
    clients: users.getClientsFromAgency,
    members: users.getMembersFromAgency,
    connections: connections.getConnectionsFromAgency,
    alerts: alerts.getAlertsFromAgency,
}

const business: BusinessResolvers = {
    members: users.getMembersFromBusiness,
    connections: connections.getConnectionsFromBusiness,
}

const connection: ConnectionResolvers = {
    client: users.getClientFromConnection,
}

const alert: AlertResolvers = {
    connection: connections.getConnectionFromAlert,
}

export const resolvers: Resolvers = {
    Query: query,
    Mutation: mutation,
    User: user,
    Agency: agency,
    Business: business,
    Connection: connection,
    Alert: alert,
}
