import User from "../models/user-model";
import { IUser } from "../types/user";

const getAll = async () => {
  const users = await User.find();
  return users;
};

const getById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

const getByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

const create = async (userData: IUser) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const updateById = async (id: any, userData: any) => {
  console.log(userData);
  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: userData,
    },
    { new: true }
  );
  return user;
};

const deleteById = async (id: any) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

export default { getAll, getById, create, updateById, deleteById, getByEmail };
