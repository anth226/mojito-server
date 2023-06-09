import {
    MutationResolvers,
    QueryResolvers,
    Resolvers,
} from "../__generated__/resolvers-types"

import * as users from "./users"

const queries: QueryResolvers = {
    user: users.getUserById,
}

const mutations: MutationResolvers = {
    registerAgency: users.registerUserForAgency,
    login: users.loginUser,
}

export const resolvers: Resolvers = { Query: queries, Mutation: mutations }
