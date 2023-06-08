import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getConnections = async (
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
        const connections = await dataSources.connections.getAll()
        console.log(connections)
        return {
            connections: connections,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error) {
        return {
            connections: null,
            response: {
                status: 404,
                message: "Query failed!",
            },
        }
    }
}

export default getConnections
