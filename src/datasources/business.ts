import { BusinessModel } from "../models"
import * as types from "../types"

export class BusinessDatasource implements types.BusinessDatasource {
    async create(business: Partial<types.Business>): Promise<types.Business> {
        return (await BusinessModel.create(business)).toObject()
    }

    async update(
        id: string,
        changes: Partial<types.Business>
    ): Promise<types.Business | null> {
        const business = await BusinessModel.findByIdAndUpdate(id, changes, {
            new: true,
        })
        return business ? business.toObject() : null
    }

    async getById(businessId: string): Promise<types.Business | null> {
        const business = await BusinessModel.findById(businessId)
        return business ? business.toObject() : null
    }
}
