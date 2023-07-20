import * as gql from "../__generated__/resolvers-types"
import { UNAUTHORIZED_ERROR } from "./errors"

export const getBusinessFromUser: gql.UserResolvers["business"] = async (
    parent,
    _args,
    context,
    _info
): Promise<gql.Business | null> => {
    const user = await context.datasources.user.getById(parent._id)

    if (!user || !user.businessId) {
        return null
    }

    const business = await context.datasources.business.getById(user.businessId)

    if (!business) {
        return null
    }

    return {
        ...business,
        createdAt: business.createdAt.toISOString(),
        updatedAt: business.updatedAt.toISOString(),
    }
}

export const updateBusiness: gql.MutationResolvers["updateBusiness"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.UpdateBusinessPayload | null> => {
    if (!context.user || context.user.accountType != gql.AccountType.Business) {
        throw UNAUTHORIZED_ERROR
    }

    const business = await context.datasources.agency.update(context.user._id, {
        name: args.input.name ?? undefined,
        logo: args.input.logo ?? undefined,
    })

    if (!business) {
        return null
    }

    return {
        clientMutationId: args.input.clientMutationId,
        business: {
            ...business,
            createdAt: business.createdAt.toISOString(),
            updatedAt: business.updatedAt.toISOString(),
        },
    }
}
