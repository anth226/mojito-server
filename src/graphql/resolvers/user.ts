import * as gql from "../__generated__/resolvers-types"
import * as auth from "../../auth"
import bcrypt from "bcrypt"
import { GraphQLError } from "graphql"

const PASSWORD_DEFAULT_SALT_ROUNDS = 12

export const getCurrentUser: gql.QueryResolvers["viewer"] = async (
    _parent,
    _args,
    context,
    _info
): Promise<gql.User | null> => {
    if (!context.user) {
        return null
    }

    const user = await context.datasources.user.getById(context.user._id)

    if (!user) {
        return null
    }
    user.status

    return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    }
}

export const getUserById: gql.QueryResolvers["user"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.User | null> => {
    const user = await context.datasources.user.getById(args.id)

    if (!user) {
        return null
    }

    return {
        ...user,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    }
}

export const loginUser: gql.MutationResolvers["login"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.LoginPayload | null> => {
    const user = await context.datasources.user.getByEmail(args.input.email)

    if (!user) {
        return {
            success: false,
            reason: "Email is not valid",
        }
    }

    const passwordIsValid = await bcrypt.compare(
        args.input.password,
        user.password
    )

    if (!passwordIsValid) {
        return {
            success: false,
            reason: "Password is not valid",
        }
    }

    const accessToken = await auth.createAccessToken(
        context.authPrivateKey,
        user
    )

    return {
        success: true,
        accessToken,
        user: {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
        },
    }
}

export const registerUserForAgency: gql.MutationResolvers["registerAgency"] =
    async (
        _parent,
        args,
        context,
        _info
    ): Promise<gql.RegisterAgencyPayload | null> => {
        const userWithEmail = await context.datasources.user.getByEmail(
            args.input.email
        )

        if (userWithEmail) {
            throw new Error("Email already used")
        }

        const hashedPassword = await bcrypt.hash(
            args.input.password,
            PASSWORD_DEFAULT_SALT_ROUNDS
        )

        const agency = await context.datasources.agency.create({
            name: args.input.agencyName,
        })

        const user = await context.datasources.user.create({
            name: args.input.agencyName,
            email: args.input.email,
            accountType: gql.AccountType.Agency,
            password: hashedPassword,
            status: gql.UserStatus.Active,
            agencyId: agency._id,
        })

        return {
            clientMutationId: args.input.clientMutationId,
            user: {
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            },
        }
    }

export const registerUserForBusiness: gql.MutationResolvers["registerBusiness"] =
    async (
        _parent,
        args,
        context,
        _info
    ): Promise<gql.RegisterBusinessPayload | null> => {
        const userWithEmail = await context.datasources.user.getByEmail(
            args.input.email
        )

        if (userWithEmail) {
            throw new Error("Email already used")
        }

        const hashedPassword = await bcrypt.hash(
            args.input.password,
            PASSWORD_DEFAULT_SALT_ROUNDS
        )

        const business = await context.datasources.business.create({
            name: args.input.businessName,
        })

        const user = await context.datasources.user.create({
            name: args.input.businessName,
            email: args.input.email,
            accountType: gql.AccountType.Business,
            password: hashedPassword,
            status: gql.UserStatus.Active,
            businessId: business._id,
        })

        return {
            clientMutationId: args.input.clientMutationId,
            user: {
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            },
        }
    }

export const inviteClients: gql.MutationResolvers["inviteClients"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.InviteClientsPayload | null> => {
    if (!context.user || context.user.accountType != gql.AccountType.Agency) {
        throw new GraphQLError("Unauthorized", {
            extensions: {
                http: {
                    status: 401,
                },
            },
        })
    }

    const clients = new Array<gql.User>()

    for (const input of args.input.clients) {
        if (!input) continue

        const clientWithEmail = await context.datasources.user.getByEmail(
            input.email
        )

        if (clientWithEmail) {
            throw new Error("Email already used")
        }

        const client = await context.datasources.user.create({
            name: input.name,
            email: input.email,
            password: "temp_password",
            accountType: gql.AccountType.Client,
            agencyId: context.user.agencyId,
            status: gql.UserStatus.Invited,
        })

        clients.push({
            ...client,
            createdAt: client.createdAt.toISOString(),
            updatedAt: client.updatedAt.toISOString(),
        })
    }

    return {
        clientMutationId: args.input.clientMutationId,
        clients,
    }
}

export const inviteMembers: gql.MutationResolvers["inviteMembers"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.InviteMembersPayload | null> => {
    if (!context.user) {
        throw new GraphQLError("Unauthorized", {
            extensions: {
                http: {
                    status: 401,
                },
            },
        })
    }

    const members = new Array<gql.User>()
    for (const input of args.input.members) {
        if (!input) continue

        const memberWithEmail = await context.datasources.user.getByEmail(
            input.email
        )

        if (memberWithEmail) {
            throw new Error("Email already used")
        }

        const member = await context.datasources.user.create({
            name: input.name,
            email: input.email,
            password: "temp_password",
            accountType: context.user.accountType,
            agencyId: context.user.agencyId,
            businessId: context.user.businessId,
            status: gql.UserStatus.Invited,
        })

        members.push({
            ...member,
            createdAt: member.createdAt.toISOString(),
            updatedAt: member.updatedAt.toISOString(),
        })
    }

    return {
        clientMutationId: args.input.clientMutationId,
        members,
    }
}

export const getMembersFromBusiness: gql.BusinessResolvers["members"] = async (
    parent,
    args,
    context,
    _info
): Promise<gql.UserConnection> => {
    const [members, count] = await context.datasources.user.search({
        nameOrEmail: args.nameOrEmail!!,
        businessId: parent._id,
        take: args.take!!,
        skip: args.skip!!,
        orderBy: args.orderBy!!,
    })

    const skip = args.skip || 0

    return {
        nodes: members.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
        })),
        hasMore: args.take ? args.take + skip < count : false,
        totalCount: count,
    }
}

export const getMembersFromAgency: gql.AgencyResolvers["members"] = async (
    parent,
    args,
    context,
    _info
): Promise<gql.UserConnection> => {
    const [members, count] = await context.datasources.user.search({
        nameOrEmail: args.nameOrEmail!!,
        agencyId: parent._id,
        take: args.take!!,
        skip: args.skip!!,
        orderBy: args.orderBy!!,
    })

    const skip = args.skip || 0

    return {
        nodes: members.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
        })),
        hasMore: args.take ? args.take + skip < count : false,
        totalCount: count,
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
        clientFrom: parent._id,
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

export const getClientFromConnection: gql.ConnectionResolvers["client"] =
    async (parent, _args, context, _info): Promise<gql.User | null> => {
        const connection = await context.datasources.connection.getById(
            parent._id
        )

        if (!connection || !connection.clientId) {
            return null
        }

        const client = await context.datasources.user.getById(
            connection.clientId
        )

        if (!client) {
            return null
        }

        return {
            ...client,
            createdAt: client.createdAt.toISOString(),
            updatedAt: client.updatedAt.toISOString(),
        }
    }
