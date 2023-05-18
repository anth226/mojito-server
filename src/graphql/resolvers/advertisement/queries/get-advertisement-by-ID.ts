import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const getAdvertisementByID = async (
  parents: any,
  { id }: { id: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const advertisement = await dataSources.advertisement.getById(id);
    logger.info("get Advertisement by Id", advertisement);
    return {
      advertisement: advertisement,
      response: {
        status: 200,
        message: "Query successfully!",
      },
    };
  } catch (error: any) {
    return {
      Advertisement: null,
      response: {
        status: 404,
        message: "Query failed!" + " : " + error.message,
      },
    };
  }
};

export default getAdvertisementByID;
