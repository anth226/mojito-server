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
export interface IAlertDataSource {
  getAll(): Promise<IAlert[]>;
  getById(id: string): Promise<IAlert | null>;
  create(input: IAlert): Promise<IAlert>;
  updateById(id: string, input: Partial<IAlert>): Promise<IAlert | null>;
  deleteById(id: string): Promise<IAlert | null>;
}
