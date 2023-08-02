import NodeCache from "node-cache"
import { BusinessModel } from "../models"
import * as types from "../types"

export class BusinessDatasource implements types.BusinessDatasource {
    constructor(private cache: NodeCache) { }

    async create(business: Partial<types.Business>): Promise<types.Business> {
        return (await BusinessModel.create(business)).toObject()
    }

    async update(
        id: string,
        changes: Partial<types.Business>
    ): Promise<types.Business | null> {
        if (this.cache.has(id)) {
            this.cache.del(id)
        }

        const business = await BusinessModel.findByIdAndUpdate(id, changes, {
            new: true,
        })
        return business ? business.toObject() : null
    }

    async getById(id: string): Promise<types.Business | null> {
        if (this.cache.has(id)) {
            return this.cache.get<any>(id)
        }

        const business = await BusinessModel.findById(id)
        if (!business) return null

        this.cache.set(id, business.toObject())

        return business.toObject()
    }
}
