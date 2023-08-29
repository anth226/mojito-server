export interface BillingHistoryDataSource{
    create(billingDetail: Partial<BillingHistory>): Promise<BillingHistory>
    update(id: string, changes: Partial<BillingHistory>): Promise<BillingHistory | null>
    updateBy(invoiceId: string, changes: Partial<BillingHistory>): Promise<BillingHistory | null>
    getById(id: string): Promise<BillingHistory| null>

}

export type BillingHistory={
    _id: string 
    title: string,
    amount: number,
    date: Date,
    status: string,
    invoiceId:string
    userId:string,
    downloadInvoice:string
    createdAt: Date
    updatedAt: Date
}