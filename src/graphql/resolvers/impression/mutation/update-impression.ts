import { IDataSources } from "../../../../types/datasource"
import { IImpression } from "../../../../types/impression"
import logger from "../../../../utils/logger"

const updateImpression = async (
    parents: any,
    { id, impression: input }: { id: string; impression: Partial<IImpression> },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        logger.info("update Impression", input)
        const impression = await dataSources.impression.updateById(id, input)
        logger.info(impression)
        return {
            impression: impression,
            response: {
                status: 200,
                message: "Impression Update Successfully!",
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

export default updateImpression
