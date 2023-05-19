import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { returnError } from "./Commonfunctions";
import { ErrorHandler } from "./CommonTypes";
import dotenv from "dotenv";

dotenv.config();
// const privateKey = fs.readFileSync(
//   path.join(__dirname, "../../private/private.key"),
//   "utf8"
// );
// const publicKey = fs.readFileSync(
//   path.join(__dirname, "../../private/public.key"),
//   "utf8"
// );

export const generateJWT = (data: any) => {
  const options = {
    expiresIn: "7d",
    issuer: "mojito",
    subject: data.id,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      data,
      process.env.JWT_SECRET_KEY as string,
      options,
      function (err: any, token: any) {
        if (err) return reject(returnError(500, err.message));
        resolve(token);
      }
    );
  });
};

export const verifyJWT = (token: any) => {
  return new Promise((resolve, reject) => {
    const options = {
      issuer: "mojito",
    };
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      options,
      (err: any, decode: any) => {
        if (err) {
          if (err.name == "TokenExpiredError")
            return reject(returnError(406, "Token Expired"));
          if (err.name == "JsonWebTokenError")
            return reject(returnError(406, "Token Malformed"));
          if (err.name == "NotBeforeError")
            return reject(returnError(400, "Token Inactive"));
        }
        resolve(decode);
      }
    );
  });
};

export const generateSalt = async (size: number) => {
  return await bcrypt.genSalt(size);
};

export const getHashedPassword = async (password: string, size: number) => {
  const saltRounds = await generateSalt(size);
  return await bcrypt.hash(password, saltRounds);
};

export const verifyBT = (token: string) => {
  if (token === process.env.BEARER_TOKEN) return { role: "service" };
  else throw new ErrorHandler(406, "Token Malformed");
};

export const matchPassword = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};
