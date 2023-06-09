import logger from "../../utils/logger"
import * as gql from "../__generated__/resolvers-types"
import bcrypt from "bcrypt"

const PASSWORD_DEFAULT_SALT_ROUNDS = 12

export const getUserById: gql.QueryResolvers["user"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.User | null> => {
    const user = await context.dataSources.user.getById(args.id)

    if (!user) {
        return null
    }

    return {
        _id: user._id,
        accountType: user.accountType,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
    }
}

// TODO: create access token
export const loginUser: gql.MutationResolvers["login"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.LoginPayload | null> => {
    const user = await context.dataSources.user.getByEmail(args.input.email)

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

    return {
        success: true,
        accessToken: "JWT_TOKEN",
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
        const userWithEmail = await context.dataSources.user.getByEmail(
            args.input.email
        )

        if (userWithEmail) {
            throw new Error("Email already used")
        }

        const hashedPassword = await bcrypt.hash(
            args.input.password,
            PASSWORD_DEFAULT_SALT_ROUNDS
        )

        const user = await context.dataSources.user.create({
            name: args.input.agencyName,
            email: args.input.email,
            accountType: gql.AccountType.Agency,
            password: hashedPassword,
        })

        // Invite clients to this agency if there is any
        if (args.input.clients) {
            for (const client of args.input.clients) {
                const clientWithEmail =
                    await context.dataSources.user.getByEmail(args.input.email)

                if (clientWithEmail) {
                    logger.info(
                        `Trying to invite client with email ${client.email} but it is already used`
                    )
                    continue
                }

                await context.dataSources.user.create({
                    name: client.name,
                    email: client.email,
                })
            }
        }

        return {
            clientMutationId: "",
            user: { ...user, createdAt: user.createdAt.toISOString() },
        }
    }
