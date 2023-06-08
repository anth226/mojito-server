import { IDataSources } from "../../../../types/datasource"

import logger from "../../../../utils/logger"
import { IAlert } from "../../../../types/alerts"

const updateAlert = async (
    parents: any,
    { id, alertInput }: { id: string; alertInput: Partial<IAlert> },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Alert = await dataSources.alert.updateById(id, alertInput)
        logger.info(Alert)
        return {
            alert: Alert,
            response: {
                status: 200,
                message: "Alert Update Successfully!",
            },
        }
    } catch (error: any) {
        return {
            alert: null,
            response: {
                status: 404,
                message: "Mutations failed!" + " : " + error.message,
            },
        }
    }
}

export default updateAlert
