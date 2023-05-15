import { ObjectId } from "mongoose";
import { IConnectionDataSource } from "./datasource";
export interface IConnection {
  type: string;
  endpoint: string;
  client: string;
}
// type _d for Mongo document
export interface IConnection_d extends Document {
  id: string;
  type: string;
  endpoint: string;
  client: ObjectId;
}

export type ConnectionModel = Model<IConnection_d, object, IConnectionMethods>;
