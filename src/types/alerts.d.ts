import { ObjectId } from "mongoose";
import { IAlertDataSource } from "./datasource";
export interface IAlert {
  name: string;
  message: string;
  client: string;
}
// type _d for Mongo document
export interface IAlert_d extends Document {
  id: string;
  name: string;
  message: string;
  client: ObjectId;
}

export type AlertModel = Model<IAlert_d, object, IAlertMethods>;
