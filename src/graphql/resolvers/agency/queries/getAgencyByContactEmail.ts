import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getAgencyByContactEmail = async (
    parents: any,
    { email }: { email: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const agency = await dataSources.agency.getByContactEmail(email)
        logger.info("get Agency by email", agency)
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

export default getAgencyByContactEmail
