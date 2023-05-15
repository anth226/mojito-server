import { IDataSources } from "../../../../types/datasource";

import logger from "../../../../utils/logger";
import { IClient } from "../../../../types/client";

const createClient = async (
  parents: any,
  { client: clientInput }: { client: IClient },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const client = await dataSources.client.create(clientInput);
    logger.info("Client created succsfully");
    return {
      client: client,
      response: {
        status: 200,
        message: "Client created succsfully!",
      },
    };
  } catch (error: any) {
    return {
      client: null,
      response: {
        status: 404,
        message: "Client creation failed!" + " : " + error.message,
      },
    };
  }
};

export default createClient;
