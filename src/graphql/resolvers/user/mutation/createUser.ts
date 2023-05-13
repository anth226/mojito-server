import { IDataSources } from "../../../../datasources/datasource";
import { IUser } from "../../../../types/user";
import logger from "../../../../utils/logger";

const createUser = async (
  parents: any,
  { user }: { user: IUser },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const exists = await dataSources.user.getByEmail(user.email);
    if (exists)
      return {
        status: 400,
        message: "User already exists!",
      };
    await dataSources.user.create(user);
    logger.info("user created succsfully");
    return {
      status: 200,
      message: "User created succsfully!",
    };
  } catch (error: any) {
    return {
      status: 404,
      message: "User creation failed!" + " : " + error.message,
    };
  }
};

export default createUser;
