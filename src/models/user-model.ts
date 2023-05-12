import mongoose from "mongoose";
import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

import { IUserMethods, IUser_d, UserModel } from "../types/user";
import { USER_ROLES } from "../constants";

const schema = new Schema<IUser_d, UserModel, IUserMethods>(
  {
    email: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string) => {
          // Validate email format using regular expression
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email format",
      },
    },
    name: {
      type: String,
      trim: true,
      min: 3,
      max: 80,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: [USER_ROLES.ADMIN, USER_ROLES.CLIENT, USER_ROLES.MARKETER],
      default: USER_ROLES.CLIENT,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

schema.methods.isValidPassword = async function (password: string) {
  const encryptedPass = (
    await User.findOne({ email: this.email }).select("password")
  )?.password as string;
  const compare = bcrypt.compare(password, encryptedPass);
  return compare;
};
const User = model<IUser_d, UserModel>("User", schema);

export default User;
