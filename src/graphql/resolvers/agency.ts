import * as gql from "../__generated__/resolvers-types"

export const getAgencyFromUser: gql.UserResolvers["agency"] = async (
    parent,
    _args,
    context,
    _info
): Promise<gql.Agency | null> => {
    if (!parent.agencyId) {
        return null
    }

    const agency = await context.datasources.agency.getById(parent.agencyId)

    if (!agency) {
        return null
    }

    return {
        ...agency,
        createdAt: agency.createdAt.toISOString(),
        updatedAt: agency.updatedAt.toISOString(),
    }
}

export const getAgencyFromOwner: gql.QueryResolvers["agency"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.Agency | null> => {
    const owner = await context.datasources.user.getById(args.owner)
    if (!owner) {
        return null
    }

    const agency = await context.datasources.agency.getById(owner.agencyId)

    if (!agency) {
        return null
    }

    return {
        ...agency,
        createdAt: agency.createdAt.toISOString(),
        updatedAt: agency.updatedAt.toISOString(),
    }
}
