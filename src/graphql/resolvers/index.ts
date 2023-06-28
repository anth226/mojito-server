import {
    AgencyResolvers,
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

const query: QueryResolvers = {
    user: users.getUserById,
    viewer: users.getCurrentUser,
}

const mutation: MutationResolvers = {
    registerAgency: users.registerUserForAgency,
    registerBusiness: users.registerUserForBusiness,
    login: users.loginUser,
    inviteClient: users.inviteClient,
    inviteMember: users.inviteMember,
    createConnection: connections.createConnection,
}

const user: UserResolvers = {
    agency: agencies.getAgencyFromUser,
    business: businesses.getBusinessFromUser,
}

const agency: AgencyResolvers = {
    clients: users.getClientsFromAgency,
    members: users.getMembersFromAgency,
    connections: connections.getConnectionsFromAgency,
}

const business: BusinessResolvers = {
    members: users.getMembersFromBusiness,
    connections: connections.getConnectionsFromBusiness,
}

const connection: ConnectionResolvers = {
    client: users.getClientFromConnection,
}

export const resolvers: Resolvers = {
    Query: query,
    Mutation: mutation,
    User: user,
    Agency: agency,
    Business: business,
    Connection: connection,
}
