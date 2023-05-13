import { IDataSources } from "../../../../datasources/datasource";
import logger from "../../../../utils/logger";

const getClientByContactEmail = async (
  parents: any,
  { email }: { email: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const client = await dataSources.client.getByContactEmail(email);
    logger.info("get Client by email", client);
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

export default getClientByContactEmail;
