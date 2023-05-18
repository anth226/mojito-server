import { ObjectId } from "mongoose";
import campaign from "../models/campaign-model";

export interface IRevenue {
  id: string;
  amount: number;
  date: string;
  campaign: string;
}
// type _d for Mongo document
export interface IRevenue_d extends Document {
  amount: number;
  date: string;
  campaign: ObjectId;
}

export type RevenueModel = Model<IRevenue_d, object>;

export interface IRevenueDataSource {
  getAll(): Promise<IRevenue[]>;
  getById(id: string): Promise<IRevenue | null>;
  create(input: IRevenue): Promise<IRevenue>;
  updateById(id: string, input: Partial<IRevenue>): Promise<IRevenue | null>;
  deleteById(id: string): Promise<IRevenue | null>;
}
