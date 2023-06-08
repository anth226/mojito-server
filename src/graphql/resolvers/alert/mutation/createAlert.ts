import { IDataSources } from "../../../../types/datasource"

import logger from "../../../../utils/logger"
import { IAlert } from "../../../../types/alerts"

const createAlert = async (
    parents: any,
    { alert: alertInput }: { alert: IAlert },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const alert = await dataSources.alert.create(alertInput)
        logger.info("Alert created succsfully")
        return {
            alert,
            response: { status: 200, message: "Alert created succsfully!" },
        }
    } catch (error: any) {
        return {
            alert: null,
            response: {
                status: 404,
                message: "Alert creation failed!" + " : " + error.message,
            },
        }
    }
}

export default createAlert
