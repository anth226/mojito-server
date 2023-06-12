import {
    MutationResolvers,
    QueryResolvers,
    Resolvers,
    UserResolvers,
} from "../__generated__/resolvers-types"

import * as users from "./users"
import * as clients from "./clients"

const query: QueryResolvers = {
    user: users.getUserById,
}

const mutation: MutationResolvers = {
    registerAgency: users.registerUserForAgency,
    login: users.loginUser,
    inviteClient: clients.inviteClient,
}

const user: UserResolvers = {
    clients: clients.getClientsFromUser,
}

export const resolvers: Resolvers = {
    Query: query,
    Mutation: mutation,
    User: user,
}
