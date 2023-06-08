import { MongooseError } from "mongoose"
import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const deleteImpression = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const impression = dataSources.impression.deleteById(id)
        logger.info(impression)
        return {
            status: 200,
            message: "Impression Delete Successfully!",
        }
    } catch (error: any) {
        return {
            status: 404,
            message: "Mutations failed!" + " : " + error.message,
        }
    }
}

export default deleteImpression
