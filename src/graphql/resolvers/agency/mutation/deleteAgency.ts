import { MongooseError } from "mongoose"
import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const deleteAgency = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Agency = dataSources.agency.deleteById(id)
        logger.info(Agency)
        return {
            status: 200,
            message: "Agency Delete Successfully!",
        }
    } catch (error: any) {
        return {
            status: 404,
            message: "Mutations failed!" + " : " + error.message,
        }
    }
}

export default deleteAgency
