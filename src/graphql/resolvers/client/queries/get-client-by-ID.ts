import { IDataSources } from "../../../../datasources/datasource";
import logger from "../../../../utils/logger";

const getClientByID = async (
  parents: any,
  { id }: { id: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const client = await dataSources.client.getById(id);
    logger.info("get Client by Id", client);
    return {
      client: client,
      response: {
        status: 200,
        message: "Query successfully!",
      },
    };
  } catch (error) {
    return {
      Client: null,
      response: {
        status: 404,
        message: "Query failed!",
      },
    };
  }
};

export default getClientByID;
