import { MongooseError } from "mongoose";
import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const deleteAdvertisement = async (
  parents: any,
  { id }: { id: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const Advertisement = dataSources.advertisement.deleteById(id);
    logger.info(Advertisement);
    return {
      status: 200,
      message: "Advertisement Delete Successfully!",
    };
  } catch (error: any) {
    return {
      status: 404,
      message: "Mutations failed!" + " : " + error.message,
    };
  }
};

export default deleteAdvertisement;
