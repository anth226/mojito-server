import {
    AgencyResolvers,
    MutationResolvers,
    QueryResolvers,
    Resolvers,
    UserResolvers,
} from "../__generated__/resolvers-types"

import * as users from "./user"
import * as clients from "./client"
import * as agencies from "./agency"

const query: QueryResolvers = {
    user: users.getUserById,
    me: users.getCurrentUser,
}

const mutation: MutationResolvers = {
    registerAgency: users.registerUserForAgency,
    login: users.loginUser,
    inviteClient: clients.inviteClient,
}

const user: UserResolvers = {
    clients: clients.getClientsFromUser,
    agency: agencies.getAgencyFromUser,
}

const agency: AgencyResolvers = {
    clients: clients.getClientsFromAgency,
}

export const resolvers: Resolvers = {
    Query: query,
    Mutation: mutation,
    User: user,
    Agency: agency,
}
