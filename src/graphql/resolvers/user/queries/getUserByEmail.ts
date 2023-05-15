import { IDataSources } from "../../../../types/datasource";
import logger from "../../../../utils/logger";

const getUserByEmail = async (
  parents: any,
  { email }: { email: string },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const user = await dataSources.user.getByEmail(email);
    logger.info("get user by email", user);
    return {
      user: user,
      response: {
        status: 200,
        message: "Query successfully!",
      },
    };
  } catch (error) {
    return {
      user: null,
      response: {
        status: 404,
        message: "Query failed!",
      },
    };
  }
};

export default getUserByEmail;
