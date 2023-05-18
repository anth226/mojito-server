import { IDataSources } from "../../../../types/datasource";
import { IAdvertisement } from "../../../../types/advertisement";
import logger from "../../../../utils/logger";

const createAdvertisement = async (
  parents: any,
  { advertisement: input }: { advertisement: IAdvertisement },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    console.log(input);
    const advertisement = await dataSources.advertisement.create(input);
    logger.info("Advertisement created succsfully");
    return {
      advertisement: advertisement,
      response: {
        status: 200,
        message: "Advertisement created succsfully!",
      },
    };
  } catch (error: any) {
    return {
      response: {
        status: 404,
        message: "Advertisement creation failed!" + " : " + error.message,
      },
    };
  }
};

export default createAdvertisement;
