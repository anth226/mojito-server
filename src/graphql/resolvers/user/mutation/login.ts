import { IDataSources } from "../../../../types/datasource";
import { IUser } from "../../../../types/user";
import { generateJWT, matchPassword } from "../../../../utils/AuthUtils";

const login = async (
  parents: any,
  { email, password }: { email: string; password: string },
  { dataSources, token }: { dataSources: IDataSources; token: string }
) => {
  try {
    console.log(token);
    if (!token && token !== (process.env.BACKEND_API_KEY as string)) {
      return {
        response: {
          status: 401,
          message: "Unauthorized!",
        },
      };
    }
    const user = await dataSources.user.getByEmail(email);
    console.log(user);
    if (!user)
      return {
        return: {
          status: 400,
          message: "User does not exsit!",
        },
      };
    console.log(user);
    const matchPassword = user.isValidPassword(password, user.password);
    if (!matchPassword) {
      return {
        status: 400,
        message: "Invalid password!",
      };
    }
    const jwtToken = await generateJWT({
      id: user._id.toString(),
      email,
      password: user.password,
    });

    return {
      token: jwtToken,
      response: {
        status: 200,
        message: "Login Succesfull!",
      },
    };
  } catch (error: any) {
    return {
      token: null,
      user: null,
      response: {
        status: 404,
        message: "User login failed!" + " : " + error.message,
      },
    };
  }
};

export default login;
