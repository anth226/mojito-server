import mongoose from "mongoose";
import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

import { ICampaign_d, campaignModel } from "../types/campaign";
import { getNumericNanoId } from "../utils/Commonfunctions";

const schema = new Schema<ICampaign_d, campaignModel>(
  {
    name: {
      type: String,
      trim: true,
      min: 3,
      max: 80,
    },
    startDate: {
      type: String,
      trim: true,
    },
    endDate: {
      type: String,
      trim: true,
    },
    budget: {
      type: Number,
      trim: true,
      min: 0,
    },
    impressions: {
      type: Number,
      trim: true,
      min: 0,
      default: 0,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      nullable: false,
    },
  },
  {
    timestamps: true,
  }
);

const campaign = model<ICampaign_d, campaignModel>("campaign", schema);

export default campaign;
