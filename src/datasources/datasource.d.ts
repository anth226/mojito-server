export interface IDataSources {
  user: IUserDataSource;
  agency: IAgencyDataSource;
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
  updateById(id: string, userData: Partial<IAgency>): Promise<IAgency | null>;
  deleteById(id: string): Promise<IAgency | null>;
}
