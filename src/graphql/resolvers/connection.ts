import { GraphQLError } from "graphql"
import * as gql from "../__generated__/resolvers-types"
import { v4 as uuid } from "uuid"
import * as types from "../../types"

function authUrl(
    context: types.RequestContext,
    conn: types.Connection
): string {
    return context.core.authFactory.create(conn.source).authUrl(conn._id)
}

export const createConnection: gql.MutationResolvers["createConnection"] =
    async (
        _parent,
        args,
        context,
        _info
    ): Promise<gql.CreateConnectionPayload | null> => {
        if (!context.user) {
            throw new GraphQLError("Unauthorized", {
                extensions: {
                    http: {
                        status: 401,
                    },
                },
            })
        }

        const conn = await context.datasources.connection.create({
            source: args.input.source,
            agencyId: context.user.agencyId,
            businessId: context.user.businessId,
            clientId: args.input.clientId!!,
        })

        return {
            clientMutationId: uuid(),
            connection: {
                ...conn,
                authUrl: authUrl(context, conn),
                createdAt: conn.createdAt.toISOString(),
                updatedAt: conn.updatedAt.toISOString(),
            },
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
            nodes: connections.map((conn) => ({
                ...conn,
                authUrl: authUrl(context, conn),
                createdAt: conn.createdAt.toISOString(),
                updatedAt: conn.updatedAt.toISOString(),
            })),
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
            nodes: connections.map((conn) => ({
                ...conn,
                authUrl: authUrl(context, conn),
                createdAt: conn.createdAt.toISOString(),
                updatedAt: conn.updatedAt.toISOString(),
            })),
            hasMore: args.take ? args.take + skip < count : false,
            totalCount: count,
        }
    }
