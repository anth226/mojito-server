import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const deleteConnection = async (
  parents: any,
  { id }: { id: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const Connection = dataSources.connections.deleteById(id);
    logger.info(Connection);
    return {
      status: 200,
      message: "Connection Delete Successfully!",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Mutations failed!",
    };
  }
};

export default deleteConnection;
