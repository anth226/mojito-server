import { IDataSources } from "../../../../types/datasource";

import logger from "../../../../utils/logger";
import { ICampaign } from "../../../../types/campaign";

const createcampaign = async (
  parents: any,
  { campaign: campaignInput }: { campaign: ICampaign },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    console.log(campaignInput);
    const campaign = await dataSources.campaigns.create(campaignInput);
    console.log(campaign);
    logger.info("campaign created succsfully");
    return {
      campaign: campaign,
      response: {
        status: 200,
        message: "campaign created succsfully!",
      },
    };
  } catch (error: any) {
    return {
      campaign: null,
      response: {
        status: 404,
        message: "campaign creation failed!" + " : " + error.message,
      },
    };
  }
};

export default createcampaign;
