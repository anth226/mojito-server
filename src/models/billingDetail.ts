import mongoose from "mongoose"
import { v4 as uuid } from "uuid"

export interface userBillingDetailDocument extends mongoose.Document {
    _id: string
    email: string
    name:string
    clientId:string
    cardBrand:string
    cardId:string
    phone:string
    expiry:string
    customerId:string
    card:number
    street: string
    country_code: string
    subscriptionId:string
    quantity:number
    apt_suit_number: string
    region: string
    state: string
    city: string
    zip_code: number
    createdAt: Date
    updatedAt: Date
}
const  userBillingDetailSchema =  new mongoose.Schema<userBillingDetailDocument>(
  {  _id: {
        type: String,
        default: uuid,
    },
    email: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    cardBrand: {
        type: String,
    },
    country_code: {
        type: String,
    },
    phone: {
        type: String,
    },
    expiry: {
        type: String,
    },
    cardId: {
        type: String,
    },
    customerId: {
        type: String,
    },
    card: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    clientId: {
        type: String,
        index: true,
    },
    subscriptionId: {
        type: String,
        index: true,
    },
    street: {
        type: String,
    },
    apt_suit_number: {
        type: String,
    },
    region: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    zip_code: {
        type: Number,
    },
    

},
{
    timestamps: true,
}

)

export const UserBillingDetailModel = mongoose.model<userBillingDetailDocument>("BillingDetail", userBillingDetailSchema)