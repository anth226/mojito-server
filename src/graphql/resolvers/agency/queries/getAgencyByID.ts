import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getAgencyByID = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const agency = await dataSources.agency.getById(id)
        logger.info("get Agency by Id", agency)
        return {
            agency: agency,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error: any) {
        return {
            Agency: null,
            response: {
                status: 404,
                message: "Query failed!" + " : " + error.message,
            },
        }
    }
}

export default getAgencyByID
