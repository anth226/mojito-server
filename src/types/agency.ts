export interface AgencyDatasource {
    create(agency: Partial<Agency>): Promise<Agency>
}

export type Agency = {
    _id: string
    name: string
    createdAt: Date
}
