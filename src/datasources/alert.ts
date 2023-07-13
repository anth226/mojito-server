import { FilterQuery, QueryOptions } from "mongoose"
import { AlertModel, AlertDocument } from "../models"
import * as types from "../types/alert"
import { AlertOrderField } from "../graphql/__generated__/resolvers-types"

export class AlertDatasource implements types.AlertDatasource {
    async getById(id: string): Promise<types.Alert | null> {
        const alert = await AlertModel.findById(id)
        return alert ? alert.toObject() : null
    }

    async update(
        id: string,
        changes: Partial<types.Alert>
    ): Promise<types.Alert | null> {
        const alert = await AlertModel.findByIdAndUpdate(id, changes)
        return alert ? alert.toObject() : null
    }

    async create(alert: Partial<types.Alert>): Promise<types.Alert> {
        return (await AlertModel.create(alert)).toObject()
    }

    async search(query: types.AlertQuery): Promise<[types.Alert[], number]> {
        const filter: FilterQuery<AlertDocument> = {}
        const options: QueryOptions<AlertDocument> = {}

        if (query.name) {
            filter.name = new RegExp(query.name, "gi")
        }

        if (query.archived) {
            filter.archived = query.archived
            filter.archived = { $not: "" }
        }

        if (query.clientIds) {
            filter.clientIds = { $in: query.clientIds }
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
            if (query.orderBy.field == AlertOrderField.Name) {
                options.sort.name = query.orderBy.direction.toLowerCase()
            }
            if (query.orderBy.field == AlertOrderField.CreatedAt) {
                options.sort.createdAt = query.orderBy.direction.toLowerCase()
            }
        }

        const alerts = await AlertModel.find(filter, null, options)
        const total = await AlertModel.count(filter)

        return [alerts.map((a) => a.toObject()), total]
    }
}
