import { IDataSources } from "../../../../types/datasource"

import logger from "../../../../utils/logger"
import { IConnection } from "../../../../types/connections"

const createConnection = async (
    parents: any,
    { connection: connectionInput }: { connection: IConnection },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        console.log(connectionInput)
        const connection = await dataSources.connections.create(connectionInput)
        console.log(connection)
        logger.info("Connection created succsfully")
        return {
            connection: connection,
            response: {
                status: 200,
                message: "Connection created succsfully!",
            },
        }
    } catch (error: any) {
        return {
            connection: null,
            response: {
                status: 404,
                message: "Connection creation failed!" + " : " + error.message,
            },
        }
    }
}

export default createConnection
