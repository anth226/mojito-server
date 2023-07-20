export interface AgencyDatasource {
    create(agency: Partial<Agency>): Promise<Agency>
    update(id: string, changes: Partial<Agency>): Promise<Agency | null>
    getById(agencyId: string): Promise<Agency | null>
}

export type Agency = {
    _id: string
    name: string
    logo: string
    createdAt: Date
    updatedAt: Date
}
