import { IDataSources } from "../../../../types/datasource";
import { IUser } from "../../../../types/user";
import logger from "../../../../utils/logger";

const updateUser = async (
  parents: any,
  { id, userInput }: { id: string; userInput: Pick<IUser, "name"> },
  { dataSources }: { dataSources: IDataSources }
) => {
  try {
    const user = await dataSources.user.updateById(id, userInput);
    logger.info(user);
    return {
      status: 200,
      message: "User Update Successfully!",
    };
  } catch (error) {
    return {
      status: 404,
      message: "Mutations failed!",
    };
  }
};

export default updateUser;
