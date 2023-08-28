import mongoose from "mongoose"
import { v4 as uuid } from "uuid"

export interface billingHistoryDocument extends mongoose.Document{
    _id: string 
    title: string,
    amount: number,
    date: Date,
    status: string,
    invoiceId:string
    downloadInvoice:string
    userId:string
    createdAt: Date
    updatedAt: Date

}

const  userBillingDetailSchema =  new mongoose.Schema<billingHistoryDocument>({
    _id: {
        type: String,
        default: uuid,
    },
    title: {
        type: String,
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
    },
    date: {
        type: Date,
    },
    userId: {
        type: String,
    },
    invoiceId: {
        type: String,
    },
    downloadInvoice: {
        type: String,
    },
    

},
{
    timestamps: true,
})

export const UserBillingHistoryModel = mongoose.model<billingHistoryDocument>("BillingHistory", userBillingDetailSchema)