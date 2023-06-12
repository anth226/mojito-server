import * as gql from "../__generated__/resolvers-types"
import { v4 as uuid } from "uuid"

export const inviteClient: gql.MutationResolvers["inviteClient"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.InviteClientPayload | null> => {
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
    })

    return {
        clientMutationId: uuid(),
        user: {
            ...client,
            createdAt: client.createdAt.toISOString(),
        },
    }
}

export const getClientsFromUser: gql.UserResolvers["clients"] = async (
    parent,
    _args,
    context,
    _info
): Promise<Array<gql.User> | null> => {
    if (!parent.agencyId) {
        return null
    }

    const clients = await context.datasources.user.getClientsFrom(
        parent.agencyId
    )

    return clients.map((cl) => ({
        ...cl,
        createdAt: cl.createdAt.toISOString(),
    }))
}
