import * as gql from "../__generated__/resolvers-types"
import { GraphQLError } from "graphql"
import { UNAUTHORIZED_ERROR } from "./errors"

export const createAlerts: gql.MutationResolvers["createAlerts"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.CreateAlertsPayload | null> => {
    if (!context.user) {
        throw new GraphQLError("Unauthorized", {
            extensions: {
                http: {
                    status: 401,
                },
            },
        })
    }

    const alerts = new Array<gql.Alert>()

    for (const input of args.input.alerts) {
        if (!input) continue

        const alert = await context.datasources.alert.create({
            name: input.name,
            clientIds: input.clientIds || [],
            agencyId: context.user.agencyId,
            businessId: context.user.businessId,
            operation: input.operation,
            parameter: input.parameter,
            value: input.value,
            archived: false,
        })

        alerts.push({
            ...alert,
            createdAt: alert.createdAt.toISOString(),
            updatedAt: alert.updatedAt.toISOString(),
        })
    }

    return {
        clientMutationId: args.input.clientMutationId,
        alerts,
    }
}

export const archiveAlert: gql.MutationResolvers["archiveAlert"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.ArchiveAlertPayload | null> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    await context.datasources.alert.update(args.input.id, { archived: true })

    return { clientMutationId: args.input.clientMutationId }
}

export const getAlerts: gql.QueryResolvers["alerts"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.AlertConnection> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    const [alerts, count] = await context.datasources.alert.search({
        agencyId: context.user.agencyId,
        businessId: context.user.businessId,
        take: args.take!!,
        skip: args.skip!!,
        orderBy: args.orderBy!!,
    })

    const skip = args.skip || 0

    return {
        nodes: alerts.map((alert) => ({
            ...alert,
            createdAt: alert.createdAt.toISOString(),
            updatedAt: alert.updatedAt.toISOString(),
        })),
        hasMore: args.take ? args.take + skip < count : false,
        totalCount: count,
    }
}

export const getAlertsFromAgency: gql.AgencyResolvers["alerts"] = async (
    parent,
    args,
    context,
    _info
): Promise<gql.AlertConnection> => {
    const [alerts, count] = await context.datasources.alert.search({
        agencyId: parent._id,
        take: args.take!!,
        skip: args.skip!!,
        orderBy: args.orderBy!!,
    })

    const skip = args.skip || 0

    return {
        nodes: alerts.map((alert) => ({
            ...alert,
            createdAt: alert.createdAt.toISOString(),
            updatedAt: alert.updatedAt.toISOString(),
        })),
        hasMore: args.take ? args.take + skip < count : false,
        totalCount: count,
    }
}
