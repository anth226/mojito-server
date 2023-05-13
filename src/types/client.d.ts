import { IClientDataSource } from "../datasources/datasource";

export interface IClient {
  name: string;
  address: string;
  contactPerson: string;
  agency: string;
  contactEmail: string;
}
// types suffix _d are for Mongo document
export interface IClient_d extends Document {
  id: string;
  name: string;
  address: string;
  agency: ObjectId;
  contactPerson: string;
  contactEmail: string;
}

export type ClientModel = Model<IClient_d, {}, IClientMethods>;
