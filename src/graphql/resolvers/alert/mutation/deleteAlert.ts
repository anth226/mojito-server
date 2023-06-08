import { MongooseError } from "mongoose"
import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const deleteAlert = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Alert = dataSources.alert.deleteById(id)
        logger.info(Alert)
        return {
            status: 200,
            message: "Alert Delete Successfully!",
        }
    } catch (error: any) {
        return {
            status: 404,
            message: "Mutations failed!" + " : " + error.message,
        }
    }
}

export default deleteAlert
