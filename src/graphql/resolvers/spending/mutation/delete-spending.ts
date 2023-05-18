import { MongooseError } from "mongoose";
import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const deleteSpending = async (
  parents: any,
  { id }: { id: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const spending = dataSources.spending.deleteById(id);
    logger.info(spending);
    return {
      status: 200,
      message: "Spending Delete Successfully!",
    };
  } catch (error: any) {
    return {
      status: 404,
      message: "Mutations failed!" + " : " + error.message,
    };
  }
};

export default deleteSpending;
