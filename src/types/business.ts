export interface BusinessDatasource {
    create(business: Partial<Business>): Promise<Business>
    update(id: string, changes: Partial<Business>): Promise<Business | null>
    getById(businessId: string): Promise<Business | null>
}

export type Business = {
    _id: string
    name: string
    logo: string
    createdAt: Date
    updatedAt: Date
}
