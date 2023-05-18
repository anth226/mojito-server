import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const getRevenues = async (
  parents: any,
  {
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const revenues = await dataSources.revenue.getAll();
    return {
      revenues: revenues,
      response: {
        status: 200,
        message: "Query successfully!",
      },
    };
  } catch (error: any) {
    return {
      agencies: null,
      response: {
        status: 404,
        message: "Query failed!" + " : " + error.message,
      },
    };
  }
};

export default getRevenues;
