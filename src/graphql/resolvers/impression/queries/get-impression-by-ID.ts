import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getImpressionByID = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Impression = await dataSources.impression.getById(id)
        logger.info("get Impression by Id", Impression)
        return {
            Impression: Impression,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error: any) {
        return {
            Impression: null,
            response: {
                status: 404,
                message: "Query failed!" + " : " + error.message,
            },
        }
    }
}

export default getImpressionByID
