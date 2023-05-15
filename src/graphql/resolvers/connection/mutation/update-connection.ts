import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";
import { IConnection } from "../../../../types/connections";

const updateConnection = async (
  parents: any,
  {
    id,
    connection: connectionInput,
  }: { id: string; connection: Partial<IConnection> },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const connection = await dataSources.connections.updateById(
      id,
      connectionInput
    );
    logger.info(connection);
    return {
      connection: connection,
      response: {
        status: 200,
        message: "Connection Update Successfully!",
      },
    };
  } catch (error) {
    return {
      connection: null,
      response: {
        status: 404,
        message: "Mutations failed!",
      },
    };
  }
};

export default updateConnection;
