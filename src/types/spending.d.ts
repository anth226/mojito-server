export interface ISpending {
  id: string;
  amount: number;
  date: string;
  campaign: string;
}
// type _d for Mongo document
export interface ISpending_d extends Document {
  amount: number;
  date: string;
  campaign: ObjectId;
}

export type SpendingModel = Model<ISpending_d, object>;

export interface ISpendingDataSource {
  getAll(): Promise<ISpending[]>;
  getById(id: string): Promise<ISpending | null>;
  create(input: ISpending): Promise<ISpending>;
  updateById(id: string, input: Partial<ISpending>): Promise<ISpending | null>;
  deleteById(id: string): Promise<ISpending | null>;
}
