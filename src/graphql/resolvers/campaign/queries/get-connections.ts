import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const getcampaigns = async (
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
    const campaigns = await dataSources.campaigns.getAll();
    console.log(campaigns);
    return {
      campaigns: campaigns,
      response: {
        status: 200,
        message: "Query successfully!",
      },
    };
  } catch (error) {
    return {
      campaigns: null,
      response: {
        status: 404,
        message: "Query failed!",
      },
    };
  }
};

export default getcampaigns;
