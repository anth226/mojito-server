import { MongooseError } from "mongoose"
import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const deleteRevenue = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Revenue = dataSources.revenue.deleteById(id)
        logger.info(Revenue)
        return {
            status: 200,
            message: "Revenue Delete Successfully!",
        }
    } catch (error: any) {
        return {
            status: 404,
            message: "Mutations failed!" + " : " + error.message,
        }
    }
}

export default deleteRevenue
