import { IDataSources } from "../../../../types/datasource"
import logger from "../../../../utils/logger"

const getAdvertisements = async (
    parents: any,
    {
        limit,
        offset,
    }: {
        limit: number
        offset: number
    },
    { dataSources }: { dataSources: IDataSources }
) => {
    try {
        const advertisements = await dataSources.advertisement.getAll()
        return {
            advertisements: advertisements,
            response: {
                status: 200,
                message: "Query successfully!",
            },
        }
    } catch (error: any) {
        return {
            agencies: null,
            response: {
                status: 404,
                message: "Query failed!" + " : " + error.message,
            },
        }
    }
}

export default getAdvertisements
