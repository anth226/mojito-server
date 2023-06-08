import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getUserByID = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const user = await dataSources.user.getById(id)
        logger.info("get user by Id", user)
        return {
            user: user,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error) {
        return {
            user: null,
            response: {
                status: 404,
                message: "Query failed!",
            },
        }
    }
}

export default getUserByID
