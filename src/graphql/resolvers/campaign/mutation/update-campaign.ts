import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";
import { ICampaign } from "../../../../types/campaign";

const updatecampaign = async (
  parents: any,
  { id, campaign: campaignInput }: { id: string; campaign: Partial<ICampaign> },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const campaign = await dataSources.campaigns.updateById(id, campaignInput);
    logger.info(campaign);
    return {
      campaign: campaign,
      response: {
        status: 200,
        message: "campaign Update Successfully!",
      },
    };
  } catch (error) {
    return {
      campaign: null,
      response: {
        status: 404,
        message: "Mutations failed!",
      },
    };
  }
};

export default updatecampaign;
