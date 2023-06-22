import * as gql from "../__generated__/resolvers-types"

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
