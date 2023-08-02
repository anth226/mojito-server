import NodeCache from "node-cache"
import { AgencyModel } from "../models"
import * as types from "../types"

export class AgencyDatasource implements types.AgencyDatasource {
    constructor(private cache: NodeCache) { }

    async create(agency: Partial<types.Agency>): Promise<types.Agency> {
        return (await AgencyModel.create(agency)).toObject()
    }

    async update(
        id: string,
        changes: Partial<types.Agency>
    ): Promise<types.Agency | null> {
        if (this.cache.has(id)) {
            this.cache.del(id)
        }

        const agency = await AgencyModel.findByIdAndUpdate(id, changes, {
            new: true,
        })
        return agency ? agency.toObject() : null
    }

    async getById(id: string): Promise<types.Agency | null> {
        if (this.cache.has(id)) {
            return this.cache.get<any>(id)
        }

        const agency = await AgencyModel.findById(id)
        if (!agency) return null

        this.cache.set(id, agency.toObject())

        return agency.toObject()
    }
}
