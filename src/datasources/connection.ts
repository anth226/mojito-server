import { FilterQuery, QueryOptions } from "mongoose"
import { ConnectionDocument, ConnectionModel } from "../models"
import * as types from "../types"
import { ConnectionOrderField } from "../graphql/__generated__/resolvers-types"

export class ConnectionDatasource implements types.ConnectionDatasource {
    async getById(id: string): Promise<types.Connection | null> {
        const conn = await ConnectionModel.findById(id)
        return conn ? conn.toObject() : null
    }

    async getByEmail(email: string): Promise<types.Connection | null> {
        const connection = await ConnectionModel.findOne({ email })
        return connection ? connection.toObject() : null
    }

    async create(conn: Partial<types.Connection>): Promise<types.Connection> {
        return (await ConnectionModel.create(conn)).toObject()
    }

    async search(
        query: types.ConnectionQuery
    ): Promise<[types.Connection[], number]> {
        const filter: FilterQuery<ConnectionDocument> = {}
        const options: QueryOptions<ConnectionDocument> = {}

        if (query.agencyId) {
            filter.agencyId = query.agencyId
        }

        if (query.businessId) {
            filter.businessId = query.businessId
        }

        if (query.take || query.skip) {
            options.limit = query.take
            options.skip = query.skip
        }

        if (query.orderBy) {
            options.sort = {}
            if (query.orderBy.field == ConnectionOrderField.CreatedAt) {
                options.sort.createdAt = query.orderBy.direction.toLowerCase()
            }
        }

        const connections = await ConnectionModel.find(filter, null, options)
        const total = await ConnectionModel.count(filter)

        return [connections.map((u) => u.toObject()), total]
    }
}
