import mongoose from "mongoose";
import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

import {
  IConnection,
  ConnectionModel,
  IConnection_d,
} from "../types/connections";

const schema = new Schema<IConnection_d, ConnectionModel>(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    endpoint: {
      type: String,
      required: true,
      trim: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  { timestamps: true }
);

const Connection = model<IConnection_d, ConnectionModel>("Connection", schema);

export default Connection;
