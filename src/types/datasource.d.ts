import { IAlert } from "./alerts";
export interface IDataSources {
  user: IUserDataSource;
  agency: IAgencyDataSource;
  client: IClientDataSource;
  alert: IAlertDataSource;
  connections: IConnectionDataSource;
}

export interface IUserDataSource {
  getAll(): Promise<IUser[]>;
  getById(id: string): Promise<IUser | null>;
  getByEmail(email: string): Promise<IUser | null>;
  create(userData: IUser): Promise<IUser>;
  updateById(id: string, userData: Partial<IUser>): Promise<IUser | null>;
  deleteById(id: string): Promise<IUser | null>;
}

export interface IAgencyDataSource {
  getAll(): Promise<IAgency[]>;
  getById(id: string): Promise<IAgency | null>;
  getByContactEmail(email: string): Promise<IAgency | null>;
  create(userData: IAgency): Promise<IAgency>;
  updateById(id: string, agencyData: Partial<IAgency>): Promise<IAgency | null>;
  deleteById(id: string): Promise<IAgency | null>;
}

export interface IClientDataSource {
  getAll(): Promise<IClient[]>;
  getById(id: string): Promise<IClient | null>;
  getByContactEmail(email: string): Promise<IClient | null>;
  create(clientData: IClient): Promise<IClient>;
  updateById(id: string, clientData: Partial<IClient>): Promise<IClient | null>;
  deleteById(id: string): Promise<IClient | null>;
}
export interface IAlertDataSource {
  getAll(): Promise<IAlert[]>;
  getById(id: string): Promise<IAlert | null>;
  create(alertData: IAlert): Promise<IAlert>;
  updateById(id: string, clientData: Partial<IAlert>): Promise<IAlert | null>;
  deleteById(id: string): Promise<IAlert | null>;
}
export interface IConnectionDataSource {
  getAll(): Promise<IConnection[]>;
  getById(id: string): Promise<IConnection | null>;
  create(connectionData: IConnection): Promise<IConnection>;
  updateById(
    id: string,
    clientData: Partial<IConnection>
  ): Promise<IConnection | null>;
  deleteById(id: string): Promise<IConnection | null>;
}
