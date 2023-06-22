import { GraphQLError } from "graphql"
import * as gql from "../__generated__/resolvers-types"
import { v4 as uuid } from "uuid"

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
            secretKey: args.input.secretKey,
            agencyId: context.user.agencyId,
            businessId: context.user.businessId,
            clientId: args.input.clientId!!,
        })

        return {
            clientMutationId: uuid(),
            connection: {
                ...conn,
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
            nodes: connections.map((c) => ({
                ...c,
                createdAt: c.createdAt.toISOString(),
                updatedAt: c.updatedAt.toISOString(),
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
            nodes: connections.map((c) => ({
                ...c,
                createdAt: c.createdAt.toISOString(),
                updatedAt: c.updatedAt.toISOString(),
            })),
            hasMore: args.take ? args.take + skip < count : false,
            totalCount: count,
        }
    }
