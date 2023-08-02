import { FilterQuery, QueryOptions } from "mongoose"
import { MetricModel, MetricDocument } from "../models"
import * as types from "../types/metric"
import { MetricOrderField } from "../graphql/__generated__/resolvers-types"
import NodeCache from "node-cache"
import { createHash } from "crypto"

const SEARCH_CACHE_TTL = 8 * 24 * 60 * 60

function searchKey(query: types.MetricQuery): string {
    return createHash("sha256").update(JSON.stringify(query)).digest("hex")
}

export class MetricDatasource implements types.MetricDatasource {
    constructor(private cache: NodeCache) { }

    async getById(id: string): Promise<types.Metric | null> {
        const metric = await MetricModel.findById(id)
        return metric ? metric.toObject() : null
    }

    async update(
        id: string,
        changes: Partial<types.Metric>
    ): Promise<types.Metric | null> {
        const metric = await MetricModel.findByIdAndUpdate(id, changes, {
            new: true,
        })
        return metric ? metric.toObject() : null
    }

    async createMany(
        metrics: Array<Partial<types.Metric>>
    ): Promise<Array<types.Metric>> {
        return (await MetricModel.insertMany(metrics)).map((m) => m.toObject())
    }

    async search(query: types.MetricQuery): Promise<[types.Metric[], number]> {
        const cacheKey = searchKey(query)

        if (this.cache.has(cacheKey)) {
            return this.cache.get<any>(cacheKey)
        }

        const filter: FilterQuery<MetricDocument> = {}
        const options: QueryOptions<MetricDocument> = {}

        if (query.connectionId) {
            filter.connectionId = query.connectionId
        }

        if (query.agencyId) {
            filter.agencyId = query.agencyId
        }

        if (query.businessId) {
            filter.businessId = query.businessId
        }

        if (query.inRange) {
            if (query.inRange.from) {
                filter.from = { $gte: query.inRange.from }
            }
            if (query.inRange.to) {
                filter.to = { $lte: query.inRange.to }
            }
        }

        if (query.take || query.skip) {
            options.limit = query.take
            options.skip = query.skip
        }

        if (query.orderBy) {
            options.sort = {}
            if (query.orderBy.field == MetricOrderField.CreatedAt) {
                options.sort.createdAt = query.orderBy.direction.toLowerCase()
            }
        }

        const metrics = await MetricModel.find(filter, null, options)
        const total = await MetricModel.count(filter)
        const metricsAndTotal: [types.Metric[], number] = [
            metrics.map((a) => a.toObject()),
            total,
        ]

        this.cache.set(cacheKey, metricsAndTotal, SEARCH_CACHE_TTL)

        return metricsAndTotal
    }
}
