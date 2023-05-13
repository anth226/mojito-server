import { IDataSources } from "../../../../datasources/datasource";
import { IClient } from "../../../../types/client";
import logger from "../../../../utils/logger";

const updateClient = async (
  parents: any,
  { id, client: clientInput }: { id: string; client: Partial<IClient> },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const client = await dataSources.client.updateById(id, clientInput);
    logger.info(client);
    return {
      client: client,
      response: {
        status: 200,
        message: "Client Update Successfully!",
      },
    };
  } catch (error) {
    return {
      client: null,
      response: {
        status: 404,
        message: "Mutations failed!",
      },
    };
  }
};

export default updateClient;
