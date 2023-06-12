import { AgencyModel } from "../models/agency-model"
import * as types from "../types"

export class AgencyDatasource implements types.AgencyDatasource {
    async create(agency: Partial<types.Agency>): Promise<types.Agency> {
        return (await AgencyModel.create(agency)).toObject()
    }
}
