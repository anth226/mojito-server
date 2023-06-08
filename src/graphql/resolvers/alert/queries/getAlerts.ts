import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getAlerts = async (
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
        const alerts = await dataSources.alert.getAll()
        return {
            alerts: alerts,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error: any) {
        return {
            alerts: null,
            response: {
                status: 404,
                message: "Query failed!" + " : " + error.message,
            },
        }
    }
}

export default getAlerts
