import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const getSpendings = async (
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
    const Spendings = await dataSources.spending.getAll();
    return {
      Spendings: Spendings,
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

export default getSpendings;
