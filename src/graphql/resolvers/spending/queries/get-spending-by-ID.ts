import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getSpendingByID = async (
    parents: any,
    { id }: { id: string },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const Spending = await dataSources.spending.getById(id)
        logger.info("get Spending by Id", Spending)
        return {
            Spending: Spending,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error: any) {
        return {
            Spending: null,
            response: {
                status: 404,
                message: "Query failed!" + " : " + error.message,
            },
        }
    }
}

export default getSpendingByID
