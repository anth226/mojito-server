import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getConnectionByID = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const connection = await dataSources.connections.getById(id)
        logger.info("get Connection by Id", connection)
        return {
            connection: connection,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error) {
        return {
            Connection: null,
            response: {
                status: 404,
                message: "Query failed!",
            },
        }
    }
}

export default getConnectionByID
