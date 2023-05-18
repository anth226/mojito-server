import { IAgencyDataSource } from "./datasource";
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

export type AgencyModel = Model<IAgency_d, object, IAgencyMethods>;
export interface IAgencyDataSource {
  getAll(): Promise<IAgency[]>;
  getById(id: string): Promise<IAgency | null>;
  getByContactEmail(email: string): Promise<IAgency | null>;
  create(input: IAgency): Promise<IAgency>;
  updateById(id: string, agencyData: Partial<IAgency>): Promise<IAgency | null>;
  deleteById(id: string): Promise<IAgency | null>;
}
