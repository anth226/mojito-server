import { IDataSources } from "../../../../types/datasource";
import { IRevenue } from "../../../../types/revenue";
import logger from "../../../../utils/logger";

const createRevenue = async (
  parents: any,
  { revenue: input }: { revenue: IRevenue },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    console.log(input);
    const revenue = await dataSources.revenue.create(input);
    logger.info("Revenue created succsfully");
    return {
      revenue: revenue,
      response: {
        status: 200,
        message: "Revenue created succsfully!",
      },
    };
  } catch (error: any) {
    return {
      response: {
        status: 404,
        message: "Revenue creation failed!" + " : " + error.message,
      },
    };
  }
};

export default createRevenue;
