import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const getcampaignByID = async (
  parents: any,
  { id }: { id: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const campaign = await dataSources.campaigns.getById(id);
    logger.info("get campaign by Id", campaign);
    return {
      campaign: campaign,
      response: {
        status: 200,
        message: "Query successfully!",
      },
    };
  } catch (error) {
    return {
      campaign: null,
      response: {
        status: 404,
        message: "Query failed!",
      },
    };
  }
};

export default getcampaignByID;
