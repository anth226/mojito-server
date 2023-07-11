import { FilterQuery, QueryOptions } from "mongoose"
import { MetricModel, MetricDocument } from "../models"
import * as types from "../types/metric"
import { MetricOrderField } from "../graphql/__generated__/resolvers-types"

export class MetricDatasource implements types.MetricDatasource {
    async getById(id: string): Promise<types.Metric | null> {
        const metric = await MetricModel.findById(id)
        return metric ? metric.toObject() : null
    }

    async update(
        id: string,
        changes: Partial<types.Metric>
    ): Promise<types.Metric | null> {
        const metric = await MetricModel.findByIdAndUpdate(id, changes)
        return metric ? metric.toObject() : null
    }

    async createMany(
        metrics: Array<Partial<types.Metric>>
    ): Promise<Array<types.Metric>> {
        return (await MetricModel.insertMany(metrics)).map((m) => m.toObject())
    }

    async search(query: types.MetricQuery): Promise<[types.Metric[], number]> {
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

        return [metrics.map((a) => a.toObject()), total]
    }
}
