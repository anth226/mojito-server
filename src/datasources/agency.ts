import { AgencyModel } from "../models"
import * as types from "../types"

export class AgencyDatasource implements types.AgencyDatasource {
    async create(agency: Partial<types.Agency>): Promise<types.Agency> {
        return (await AgencyModel.create(agency)).toObject()
    }

    async getById(agencyId: string): Promise<types.Agency | null> {
        const agency = await AgencyModel.findById(agencyId)
        return agency ? agency.toObject() : null
    }
}
