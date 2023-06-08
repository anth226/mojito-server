import { IDataSources } from "../../../../types/datasource"
import { IRevenue } from "../../../../types/revenue"
import logger from "../../../../utils/logger"

const updateRevenue = async (
    parents: any,
    { id, revenueInput }: { id: string; revenueInput: Partial<IRevenue> },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Revenue = await dataSources.revenue.updateById(id, revenueInput)
        logger.info(Revenue)
        return {
            revenue: Revenue,
            response: {
                status: 200,
                message: "Revenue Update Successfully!",
            },
        }
    } catch (error: any) {
        return {
            response: {
                status: 404,
                message: "Mutations failed!" + " : " + error.message,
            },
        }
    }
}

export default updateRevenue
