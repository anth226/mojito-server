import { BusinessModel } from "../models"
import * as types from "../types"

export class BusinessDatasource implements types.BusinessDatasource {
    async create(business: Partial<types.Business>): Promise<types.Business> {
        return (await BusinessModel.create(business)).toObject()
    }

    async getById(businessId: string): Promise<types.Business | null> {
        const business = await BusinessModel.findById(businessId)
        return business ? business.toObject() : null
    }
}
