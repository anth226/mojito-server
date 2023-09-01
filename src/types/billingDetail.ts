export interface BillingDataSource{
    create(billingDetail: Partial<BillingDetail>): Promise<BillingDetail>
    update(id: string, changes: Partial<BillingDetail>): Promise<BillingDetail | null>
    getById(id: string): Promise<BillingDetail| null>
    getDetailsBy(custmerId: string): Promise<BillingDetail| null>
    getDetailsByUser(clientId: string): Promise<BillingDetail| null>

}
export type BillingDetail={
    _id: string
    email: string
    name:string
    clientId:string
    cardBrand:string
    cardId:string
    phone:string
    expiry:string
    customerId:string
    subscriptionId:string
    quantity:number
    card:string
    street: string
    country_code: string
    apt_suit_number: string
    region: string
    state: string
    city: string
    zip_code: string
    createdAt: Date
    updatedAt: Date
}