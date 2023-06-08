import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getImpressions = async (
    parents: any,
    {
        limit,
        offset,
    }: {
        limit: number
        offset: number
    },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Impressions = await dataSources.spending.getAll()
        return {
            Impressions: Impressions,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error: any) {
        return {
            agencies: null,
            response: {
                status: 404,
                message: "Query failed!" + " : " + error.message,
            },
        }
    }
}

export default getImpressions
