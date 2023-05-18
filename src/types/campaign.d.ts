import { ObjectId } from "mongoose";

export interface ICampaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  impressions: number;
  client: string;
  createdAt: string;
}
// type _d for Mongo document
export interface ICampaign_d extends Document {
  name: string;
  startDate: string;
  endDate: string;
  budget: number;
  impressions: number;
  client: ObjectId;
}

export type campaignModel = Model<ICampaign_d, object, ICampaignMethods>;
export interface ICampaignDataSource {
  getAll(): Promise<ICampaign[]>;
  getById(id: string): Promise<ICampaign | null>;
  create(input: ICampaign): Promise<ICampaign>;
  updateById(id: string, input: Partial<ICampaign>): Promise<ICampaign | null>;
  deleteById(id: string): Promise<ICampaign | null>;
}
