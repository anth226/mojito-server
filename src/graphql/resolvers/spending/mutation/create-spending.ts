import { IDataSources } from "../../../../types/datasource";
import { ISpending } from "../../../../types/spending";
import logger from "../../../../utils/logger";

const createSpending = async (
  parents: any,
  { spending: input }: { spending: ISpending },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    console.log(input);
    const spending = await dataSources.spending.create(input);
    logger.info("Spending created succsfully");
    return {
      spending: spending,
      response: {
        status: 200,
        message: "Spending created succsfully!",
      },
    };
  } catch (error: any) {
    return {
      response: {
        status: 404,
        message: "Spending creation failed!" + " : " + error.message,
      },
    };
  }
};

export default createSpending;
