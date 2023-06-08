import { Model } from "mongoose"

import DataLoader from "dataloader"
import logger from "../utils/logger"
import { IRevenue } from "../types/revenue"

export class RevenueDataSource {
    private Revenue: Model<IRevenue>

    constructor({ Revenue }: { Revenue: Model<IRevenue> }) {
        this.Revenue = Revenue
    }

    private batchRevenues = new DataLoader(async (ids: readonly string[]) => {
        const RevenueList = await this.Revenue.find({
            _id: { $in: ids },
        })
        return ids.map((id) =>
            RevenueList.find((Revenue) => Revenue._id.toString() === id)
        )
    })

    async getAll(): Promise<IRevenue[]> {
        const alert = (await this.Revenue.find()) as IRevenue[]
        return alert
    }

    async getById(id: string): Promise<IRevenue | null> {
        const Revenue = await this.Revenue.findById(id)
        return Revenue
    }

    async getByContactEmail(email: string): Promise<IRevenue | null> {
        const Revenue = await this.Revenue.findOne({
            contactPerson: email,
        })
        return Revenue
    }

    async create(RevenueData: IRevenue): Promise<IRevenue> {
        logger.info("this is working form Revenue DAta", RevenueData)
        const revenueData = new this.Revenue(RevenueData)

        await revenueData.save()
        return revenueData.toObject()
    }

    async updateById(
        id: string,
        alertData: Partial<IRevenue>
    ): Promise<IRevenue | null> {
        logger.info(alertData)
        const revenue = await this.Revenue.findByIdAndUpdate(
            id,
            {
                $set: alertData,
            },
            { new: true }
        )
        return revenue
    }

    async deleteById(id: string): Promise<IRevenue | null> {
        const Revenue = await this.Revenue.findByIdAndDelete(id)
        return Revenue
    }
}
