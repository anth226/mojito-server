import * as gql from "../__generated__/resolvers-types"
import * as types from "../../types"
import { UNAUTHORIZED_ERROR } from "./errors"
import { MetaApi } from "../../core/meta"
import dayjs from "dayjs"
import logger from "../../utils/logger"
import * as mappings from "./mappings"

export const createConnection: gql.MutationResolvers["createConnection"] =
    async (
        _parent,
        args,
        context,
        _info
    ): Promise<gql.CreateConnectionPayload | null> => {
        if (!context.user) {
            throw UNAUTHORIZED_ERROR
        }

        const conn = await context.datasources.connection.create({
            source: args.input.source,
            agencyId: context.user.agencyId,
            businessId: context.user.businessId,
            clientId: args.input.clientId!!,
        })

        return {
            clientMutationId: args.input.clientMutationId,
            connection: mappings.toConnection(context, conn),
        }
    }

export const updateConnection: gql.MutationResolvers["updateConnection"] =
    async (
        _parent,
        args,
        context,
        _info
    ): Promise<gql.UpdateConnectionPayload | null> => {
        if (!context.user) {
            throw UNAUTHORIZED_ERROR
        }

        const connection = await context.datasources.connection.update(
            args.input.connectionId,
            {
                sourceAccount: args.input.sourceAccount,
            }
        )

        if (!connection) {
            return null
        }

        return {
            clientMutationId: args.input.clientMutationId,
            connection: mappings.toConnection(context, connection),
        }
    }

export const syncConnection: gql.MutationResolvers["syncConnection"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.SyncConnectionPayload | null> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    let connection = await context.datasources.connection.getById(args.input.id)

    if (!connection) {
        return null
    }

    const syncedAt = new Date()
    let metrics = new Array<Partial<types.Metric>>()

    try {
        const oauth2Client =
            await context.core.authFactory.createFromConnection(connection)

        if (connection.source === gql.ConnectionSource.Meta) {
            const metaApi = new MetaApi(oauth2Client)

            // TODO: we're using the first account of the connection,
            // we should replace this for the adAccount from connection.adAccountId
            const accounts = await metaApi.getAdAccounts()

            await context.datasources.connection.update(args.input.id, {
                availableAccounts: accounts.map((acc) => ({
                    name: acc.name,
                    id: acc.id,
                })),
            })

            const clientAccount = accounts.find(
                (acc) => acc.id == connection?.sourceAccount
            )

            if (!clientAccount) {
                throw new Error("Account source not selected")
            }

            const syncFrom =
                connection.syncedAt ||
                dayjs()
                    .utc()
                    .subtract(Math.min(clientAccount.age, 30 * 30), "day") // Max sync time is 30 months
                    .toDate()

            const syncTo = dayjs.utc(syncedAt).subtract(1, "day").toDate()

            const insights = await metaApi.getInsights(
                clientAccount.id,
                syncFrom,
                syncTo
            )

            for (const insight of insights) {
                const from = dayjs
                    .utc(insight.date_start)
                    .startOf("day")
                    .toDate()
                const to = dayjs.utc(insight.date_stop).endOf("day").toDate()

                metrics = metrics.concat([
                    {
                        type: gql.MetricType.Cpm,
                        value: parseFloat(insight.cpm),
                        connectionId: connection._id,
                        agencyId: connection.agencyId,
                        businessId: connection.businessId,
                        from,
                        to,
                    },
                    {
                        type: gql.MetricType.Ctr,
                        value: parseFloat(insight.ctr),
                        connectionId: connection._id,
                        agencyId: connection.agencyId,
                        businessId: connection.businessId,
                        from,
                        to,
                    },
                    {
                        type: gql.MetricType.Clicks,
                        value: parseFloat(insight.clicks),
                        connectionId: connection._id,
                        agencyId: connection.agencyId,
                        businessId: connection.businessId,
                        from,
                        to,
                    },
                ])
            }
        }

        await context.datasources.metric.createMany(metrics)
    } catch (error) {
        logger.error(error, `Sync failed for connection ${connection._id}`)

        connection = (await context.datasources.connection.update(
            connection._id,
            {
                status: gql.ConnectionStatus.SyncFailed,
                syncFailedAt: syncedAt,
            }
        )) as types.Connection

        return {
            clientMutationId: args.input.clientMutationId,
            connection: mappings.toConnection(context, connection),
        }
    }

    connection = (await context.datasources.connection.update(connection._id, {
        status: gql.ConnectionStatus.Ok,
        syncedAt,
    })) as types.Connection

    return {
        clientMutationId: args.input.clientMutationId,
        connection: mappings.toConnection(context, connection),
    }
}

export const deleteConnection: gql.MutationResolvers["deleteConnection"] =
    async (
        _parent,
        args,
        context,
        _info
    ): Promise<gql.DeleteConnectionPayload | null> => {
        if (!context.user) {
            throw UNAUTHORIZED_ERROR
        }

        await context.datasources.connection.delete(args.input.id)

        return { clientMutationId: args.input.clientMutationId }
    }

export const getConnections: gql.QueryResolvers["connections"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.ConnectionConnection> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    const [connections, count] = await context.datasources.connection.search({
        agencyId: context.user.agencyId,
        businessId: context.user.businessId,
        take: args.take!!,
        skip: args.skip!!,
        orderBy: args.orderBy!!,
    })

    const skip = args.skip || 0

    return {
        nodes: connections.map((conn) => mappings.toConnection(context, conn)),
        hasMore: args.take ? args.take + skip < count : false,
        totalCount: count,
    }
}

export const getConnectionsFromAgency: gql.AgencyResolvers["connections"] =
    async (parent, args, context, _info): Promise<gql.ConnectionConnection> => {
        const [connections, count] =
            await context.datasources.connection.search({
                agencyId: parent._id,
                take: args.take!!,
                skip: args.skip!!,
                orderBy: args.orderBy!!,
            })

        const skip = args.skip || 0

        return {
            nodes: connections.map((conn) =>
                mappings.toConnection(context, conn)
            ),
            hasMore: args.take ? args.take + skip < count : false,
            totalCount: count,
        }
    }

export const getConnectionsFromBusiness: gql.BusinessResolvers["connections"] =
    async (parent, args, context, _info): Promise<gql.ConnectionConnection> => {
        const [connections, count] =
            await context.datasources.connection.search({
                businessId: parent._id,
                take: args.take!!,
                skip: args.skip!!,
                orderBy: args.orderBy!!,
            })

        const skip = args.skip || 0

        return {
            nodes: connections.map((conn) =>
                mappings.toConnection(context, conn)
            ),
            hasMore: args.take ? args.take + skip < count : false,
            totalCount: count,
        }
    }
