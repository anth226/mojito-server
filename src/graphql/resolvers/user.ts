import logger from "../../utils/logger"
import * as gql from "../__generated__/resolvers-types"
import * as auth from "../../auth"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

const PASSWORD_DEFAULT_SALT_ROUNDS = 12

export const getCurrentUser: gql.QueryResolvers["me"] = async (
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

// TODO: create access token
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
    }
}

// TODO: create alerts and connections
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

        // Invite clients to this agency if there is any
        if (args.input.clients) {
            for (const client of args.input.clients) {
                const clientWithEmail =
                    await context.datasources.user.getByEmail(args.input.email)

                if (clientWithEmail) {
                    logger.info(
                        `Trying to invite client with email ${client.email} but it is already used`
                    )
                    continue
                }

                await context.datasources.user.create({
                    name: client.name,
                    email: client.email,
                    status: gql.UserStatus.Invited,
                })
            }
        }

        return {
            clientMutationId: uuid(),
            user: {
                ...user,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            },
        }
    }
