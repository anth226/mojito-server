import campaign from "../models/campaign-model";
export interface IImpression {
  id: string;
  count: number;
  date: string;
  campaign: string;
}
// type _d for Mongo document
export interface IImpression_d extends Document {
  count: number;
  date: string;
  campaign: ObjectId;
}

export type ImpressionModel = Model<IImpression_d, object>;
export interface IImpressionDataSource {
  getAll(): Promise<IImpression[]>;
  getById(id: string): Promise<IImpression | null>;
  create(input: IImpression): Promise<IImpression>;
  updateById(
    id: string,
    input: Partial<IImpression>
  ): Promise<IImpression | null>;
  deleteById(id: string): Promise<IImpression | null>;
}
