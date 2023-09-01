import {UserBillingHistoryModel} from "../models"
import * as types from "../types/billingHistory"

export class BillingHistoryDatasource implements types.BillingHistoryDataSource{

    async  create(billingHistory: Partial<types.BillingHistory>):Promise<types.BillingHistory>{
        return (await UserBillingHistoryModel.create(billingHistory)).toObject()
    }
    async  update(id: string,
        changes: Partial<types.BillingHistory>):Promise<types.BillingHistory | null>{
         const  detail= await UserBillingHistoryModel.findByIdAndUpdate(id, changes, {
            new: true,
        })
        return detail ? detail.toObject() : null
    }
    async  updateBy(invoiceId: string,
        changes: Partial<types.BillingHistory>):Promise<types.BillingHistory | null>{
         const  detail= await UserBillingHistoryModel.findOneAndUpdate({invoiceId:invoiceId}, changes, {
            new: true,
        })
        return detail ? detail.toObject() : null
    }
    async getById(id: string): Promise<types.BillingHistory | null> {
        const history = await UserBillingHistoryModel.findById(id)
        if (!history) return null
        return history.toObject()
    }
    async getAllBy(userId: string): Promise<Array<types.BillingHistory> | null> {
        const history = await UserBillingHistoryModel.find({userId})
        if (!history) return null
        return history.map((hs) => hs.toObject())
    }

}