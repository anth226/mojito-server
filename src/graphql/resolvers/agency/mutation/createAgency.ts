import { IDataSources } from "../../../../types/datasource"
import { IAgency } from "../../../../types/agency"
import logger from "../../../../utils/logger"

const createAgency = async (
    parents: any,
    { agency }: { agency: IAgency },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        await dataSources.agency.create(agency)
        logger.info("Agency created succsfully")
        return {
            status: 200,
            message: "Agency created succsfully!",
        }
    } catch (error: any) {
        return {
            status: 404,
            message: "Agency creation failed!" + " : " + error.message,
        }
    }
}

export default createAgency
