import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getUsers = async (
    parents: any,
    {},
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const users = await dataSources.user.getAll()
        return {
            users: users,
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

export default getUsers
