export interface AgencyDatasource {
    create(agency: Partial<Agency>): Promise<Agency>
    getById(agencyId: string): Promise<Agency | null>
}

export type Agency = {
    _id: string
    name: string
    createdAt: Date
    updatedAt: Date
}
