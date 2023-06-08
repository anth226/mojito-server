import { IDataSources } from "../../../../types/datasource"
import { IUser } from "../../../../types/user"
import logger from "../../../../utils/logger"

const deleteUser = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const user = dataSources.user.deleteById(id)
        logger.info(user)
        return {
            status: 200,
            message: "User Delete Successfully!",
        }
    } catch (error) {
        return {
            status: 404,
            message: "Mutations failed!",
        }
    }
}

export default deleteUser
