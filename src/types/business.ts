export interface BusinessDatasource {
    create(business: Partial<Business>): Promise<Business>
    getById(businessId: string): Promise<Business | null>
}

export type Business = {
    _id: string
    name: string
    createdAt: Date
    updatedAt: Date
}
