import mongoose, { Mongoose } from "mongoose";
import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

import { IRevenue, RevenueModel, IRevenue_d } from "../types/revenue";
import { type } from "os";

const schema = new Schema<IRevenue_d, RevenueModel>(
  {
    amount: { type: Number, default: 0 },
    date: { type: String, nullable: false },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "campaign",
    },
  },
  { timestamps: true }
);

const Revenue = model<IRevenue_d, RevenueModel>("Revenue", schema);

export default Revenue;
