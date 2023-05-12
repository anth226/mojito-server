import { IAgencyDataSource } from "../datasources/datasource";
export interface IAgency {
  name: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
}
// type _d for Mongo document
export interface IAgency_d extends Document {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
}

export type AgencyModel = Model<IAgency_d, {}, IAgencyMethods>;
