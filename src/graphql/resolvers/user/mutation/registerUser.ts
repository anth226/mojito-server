import { IDataSources } from "../../../../types/datasource";
import { IUser } from "../../../../types/user";
import { generateJWT } from "../../../../utils/AuthUtils";

const registerUser = async (
  parents: any,
  { user }: { user: IUser },
  { dataSources, key }: { dataSources: IDataSources; key: string }
) => {
  try {
    if (!key && key !== (process.env.BACKEND_API_KEY as string)) {
      return {
        response: {
          status: 401,
          message: "Unauthorized!",
        },
      };
    }
    const exists = await dataSources.user.getByEmail(user.email);
    if (exists)
      return {
        status: 400,
        message: "User already exists!",
      };

    const userResponse = await dataSources.user.create(user);
    console.log(userResponse._id.toString());
    const token = await generateJWT({
      id: userResponse._id.toString(),
      email: userResponse.email,
      password: userResponse.password,
    });

    return {
      token: token,
      user: userResponse,
      reponse: {
        status: 200,
        message: "User created succsfully!",
      },
    };
  } catch (error: any) {
    return {
      token: null,
      user: null,
      response: {
        status: 404,
        message: "User creation failed!" + " : " + error.message,
      },
    };
  }
};

export default registerUser;
