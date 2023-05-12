import mongoose from "mongoose";
import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

import { IAgency, AgencyModel, IAgency_d } from "../types/agency";

const schema = new Schema<IAgency_d, AgencyModel>(
  {
    contactEmail: {
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
      nullable: false,
      message:
        "Invalid Name: Name should more than 3 and less than 80 characters",
    },
    address: {
      type: String,
      trim: true,
      min: 3,
      max: 200,
      nullable: false,
      message:
        "Invalid address: address should more than 3 and less than 80 characters",
    },
    contactPerson: {
      type: String,
      trim: true,
      message:
        "Invalid contact: contact person should more than 3 and less than 80 characters",
    },
  },
  { timestamps: true }
);

const Agency = model<IAgency_d, AgencyModel>("Agency", schema);

export default Agency;
