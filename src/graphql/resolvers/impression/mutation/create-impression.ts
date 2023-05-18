import { IDataSources } from "../../../../types/datasource";
import { IImpression } from "../../../../types/impression";
import logger from "../../../../utils/logger";

const createImpression = async (
  parents: any,
  { impression: input }: { impression: IImpression },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    console.log(input);
    const impression = await dataSources.impression.create(input);
    logger.info("Impression created succsfully");
    return {
      impression: impression,
      response: {
        status: 200,
        message: "Impression created succsfully!",
      },
    };
  } catch (error: any) {
    return {
      response: {
        status: 404,
        message: "Impression creation failed!" + " : " + error.message,
      },
    };
  }
};

export default createImpression;
