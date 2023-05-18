import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const getRevenueByID = async (
  parents: any,
  { id }: { id: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const revenue = await dataSources.revenue.getById(id);
    logger.info("get Revenue by Id", revenue);
    return {
      revenue: revenue,
      response: {
        status: 200,
        message: "Query successfully!",
      },
    };
  } catch (error: any) {
    return {
      Revenue: null,
      response: {
        status: 404,
        message: "Query failed!" + " : " + error.message,
      },
    };
  }
};

export default getRevenueByID;
