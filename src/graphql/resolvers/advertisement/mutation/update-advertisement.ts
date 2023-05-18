import { IDataSources } from "../../../../types/datasource";
import { IAdvertisement } from "../../../../types/advertisement";
import logger from "../../../../utils/logger";

const updateAdvertisement = async (
  parents: any,
  {
    id,
    advertisementInput,
  }: { id: string; advertisementInput: Partial<IAdvertisement> },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const Advertisement = await dataSources.advertisement.updateById(
      id,
      advertisementInput
    );
    logger.info(Advertisement);
    return {
      advertisement: Advertisement,
      response: {
        status: 200,
        message: "Advertisement Update Successfully!",
      },
    };
  } catch (error: any) {
    return {
      response: {
        status: 404,
        message: "Mutations failed!" + " : " + error.message,
      },
    };
  }
};

export default updateAdvertisement;
