import {UserBillingDetailModel} from "../models"
import * as types from "../types/billingDetail"

export class BillingDatasource implements types.BillingDataSource {

    async  create(billingDetail: Partial<types.BillingDetail>):Promise<types.BillingDetail >{
        return (await UserBillingDetailModel.create(billingDetail)).toObject()
    }
    async  update(id: string,
        changes: Partial<types.BillingDetail>):Promise<types.BillingDetail | null>{
         const  detail= await UserBillingDetailModel.findByIdAndUpdate(id, changes, {
            new: true,
        })
        return detail ? detail.toObject() : null
    }
    async getById(id: string): Promise<types.BillingDetail | null> {
        const billingDetails = await UserBillingDetailModel.findById(id)
        if (!billingDetails) return null
        return billingDetails.toObject()
    }
    async getDetailsBy(custmerId:string): Promise<types.BillingDetail | null>{
    const billingDetails = await UserBillingDetailModel.findOne({customerId:custmerId})
    if (!billingDetails) return null
        return billingDetails.toObject()
    }


}