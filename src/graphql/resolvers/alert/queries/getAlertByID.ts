import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getAlertByID = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const alert = await dataSources.alert.getById(id)
        logger.info("get Alert by Id", alert)
        return {
            alert: alert,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error: any) {
        return {
            Alert: null,
            response: {
                status: 404,
                message: "Query failed!" + " : " + error.message,
            },
        }
    }
}

export default getAlertByID
