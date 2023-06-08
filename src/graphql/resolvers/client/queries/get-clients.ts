import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getClients = async (
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
        const clients = await dataSources.client.getAll()
        return {
            clients: clients,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error) {
        return {
            clients: null,
            response: {
                status: 404,
                message: "Query failed!",
            },
        }
    }
}

export default getClients
