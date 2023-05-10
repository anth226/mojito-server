import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface ReqProps extends Request {
  isAuth?: boolean;
  _id?: string;
  role?: string;
}

const isAuth = (req: ReqProps, res: Response, next: NextFunction) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET ?? "");
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req._id = decodedToken._id;
  req.role = decodedToken.role;
  next();
};

export default isAuth;
