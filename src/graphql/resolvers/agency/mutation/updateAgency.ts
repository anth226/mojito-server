import { IDataSources } from "../../../../types/datasource"
import { IAgency } from "../../../../types/agency"
import logger from "../../../../utils/logger"

const updateAgency = async (
    parents: any,
    { id, agencyInput }: { id: string; agencyInput: Partial<IAgency> },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Agency = await dataSources.agency.updateById(id, agencyInput)
        logger.info(Agency)
        return {
            status: 200,
            message: "Agency Update Successfully!",
        }
    } catch (error: any) {
        return {
            status: 404,
            message: "Mutations failed!" + " : " + error.message,
        }
    }
}

export default updateAgency
