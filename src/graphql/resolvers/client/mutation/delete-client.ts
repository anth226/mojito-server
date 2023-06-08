import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const deleteClient = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Client = dataSources.client.deleteById(id)
        logger.info(Client)
        return {
            status: 200,
            message: "Client Delete Successfully!",
        }
    } catch (error) {
        return {
            status: 404,
            message: "Mutations failed!",
        }
    }
}

export default deleteClient
