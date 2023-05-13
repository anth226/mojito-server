export interface IDataSources {
  user: IUserDataSource;
  agency: IAgencyDataSource;
  client: IClientDataSource;
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
  create(userData: IClient): Promise<IClient>;
  updateById(id: string, clientData: Partial<IClient>): Promise<IClient | null>;
  deleteById(id: string): Promise<IClient | null>;
}
