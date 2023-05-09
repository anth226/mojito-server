export interface IUser {
  email: string;
  password: string;
  role: string;
}
// type _d for Mongo document
export interface IUser_d extends Document {
  email: string;
  password: string;
  role: string;
}
export interface IUserMethods {
  isValidPassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<IUser_d, {}, IUserMethods>;
