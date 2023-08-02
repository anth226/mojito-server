import { FilterQuery, QueryOptions } from "mongoose"
import { ConnectionDocument, ConnectionModel } from "../models"
import * as types from "../types"
import { ConnectionOrderField } from "../graphql/__generated__/resolvers-types"
import NodeCache from "node-cache"

export class ConnectionDatasource implements types.ConnectionDatasource {
    constructor(private cache: NodeCache) { }

    async getById(id: string): Promise<types.Connection | null> {
        if (this.cache.has(id)) {
            return this.cache.get<any>(id)
        }

        const conn = await ConnectionModel.findById(id)
        if (!conn) return null

        this.cache.set(id, conn.toObject())

        return conn.toObject()
    }

    async create(conn: Partial<types.Connection>): Promise<types.Connection> {
        return (await ConnectionModel.create(conn)).toObject()
    }

    async update(
        id: string,
        changes: Partial<types.Connection>
    ): Promise<types.Connection | null> {
        if (this.cache.has(id)) {
            this.cache.del(id)
        }

        const conn = await ConnectionModel.findByIdAndUpdate(id, changes, {
            new: true,
        })
        return conn ? conn.toObject() : null
    }

    async delete(id: string): Promise<void> {
        if (this.cache.has(id)) {
            this.cache.del(id)
            this.cache.del
        }

        await ConnectionModel.deleteOne({ _id: id })
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
