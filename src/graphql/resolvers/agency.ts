import * as gql from "../__generated__/resolvers-types"
import { UNAUTHORIZED_ERROR } from "./errors"

export const getAgencyFromUser: gql.UserResolvers["agency"] = async (
    parent,
    _args,
    context,
    _info
): Promise<gql.Agency | null> => {
    const user = await context.datasources.user.getById(parent._id)

    if (!user || !user.agencyId) {
        return null
    }

    const agency = await context.datasources.agency.getById(user.agencyId)

    if (!agency) {
        return null
    }

    return {
        ...agency,
        createdAt: agency.createdAt.toISOString(),
        updatedAt: agency.updatedAt.toISOString(),
    }
}

export const updateAgency: gql.MutationResolvers["updateAgency"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.UpdateAgencyPayload | null> => {
    if (!context.user || context.user.accountType != gql.AccountType.Agency) {
        throw UNAUTHORIZED_ERROR
    }

    const agency = await context.datasources.agency.update(context.user._id, {
        name: args.input.name ?? undefined,
        logo: args.input.logo ?? undefined,
    })

    if (!agency) {
        return null
    }

    return {
        clientMutationId: args.input.clientMutationId,
        agency: {
            ...agency,
            createdAt: agency.createdAt.toISOString(),
            updatedAt: agency.updatedAt.toISOString(),
        },
    }
}
