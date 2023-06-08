import { IDataSources } from "../../../../types/datasource"
import { ISpending } from "../../../../types/spending"
import logger from "../../../../utils/logger"

const updateSpending = async (
    parents: any,
    { id, spending: input }: { id: string; spending: Partial<ISpending> },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        logger.info("update Spending", input)
        const spending = await dataSources.spending.updateById(id, input)
        logger.info(spending)
        return {
            spending: spending,
            response: {
                status: 200,
                message: "Spending Update Successfully!",
            },
        }
    } catch (error: any) {
        return {
            response: {
                status: 404,
                message: "Mutations failed!" + " : " + error.message,
            },
        }
    }
}

export default updateSpending
