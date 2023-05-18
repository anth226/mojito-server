import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const deletecampaign = async (
  parents: any,
  { id }: { id: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const campaign = dataSources.campaigns.deleteById(id);
    logger.info(campaign);
    return {
      status: 200,
      message: "campaign Delete Successfully!",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Mutations failed!",
    };
  }
};

export default deletecampaign;
