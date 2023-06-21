import * as gql from "../__generated__/resolvers-types"
import { v4 as uuid } from "uuid"

export const inviteClient: gql.MutationResolvers["inviteClient"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.InviteClientPayload | null> => {
    if (!context.user) {
        return null
    }

    const clientWithEmail = await context.datasources.user.getByEmail(
        args.input.email
    )

    if (clientWithEmail) {
        throw new Error("Email already used")
    }

    const client = await context.datasources.user.create({
        name: args.input.name,
        email: args.input.email,
        password: "temp_password",
        accountType: gql.AccountType.Client,
        clientFrom: context.user.agencyId,
        status: gql.UserStatus.Invited,
    })

    return {
        clientMutationId: uuid(),
        user: {
            ...client,
            createdAt: client.createdAt.toISOString(),
            updatedAt: client.updatedAt.toISOString(),
        },
    }
}

export const getClientsFromAgency: gql.AgencyResolvers["clients"] = async (
    parent,
    args,
    context,
    _info
): Promise<gql.UserConnection> => {
    const [clients, count] = await context.datasources.user.search({
        nameOrEmail: args.nameOrEmail!!,
        agencyId: parent._id,
        take: args.take!!,
        skip: args.skip!!,
        orderBy: args.orderBy!!,
    })

    const skip = args.skip || 0

    return {
        nodes: clients.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
        })),
        hasMore: args.take ? args.take + skip < count : false,
        totalCount: count,
    }
}
