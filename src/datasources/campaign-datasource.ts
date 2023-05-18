import { Model } from "mongoose";

import DataLoader from "dataloader";
import { ICampaign } from "../types/campaign";
import logger from "../utils/logger";

export class campaignDataSource {
  private campaign: Model<ICampaign>;

  constructor({ campaign }: { campaign: Model<ICampaign> }) {
    this.campaign = campaign;
  }

  private batchcampaigns = new DataLoader(async (ids: readonly string[]) => {
    const campaignList = await this.campaign.find({
      _id: { $in: ids },
    });
    return ids.map((id) =>
      campaignList.find((campaign) => campaign._id.toString() === id)
    );
  });

  async getAll(): Promise<ICampaign[]> {
    const campaigns = (await this.campaign.find()) as ICampaign[];
    return campaigns;
  }

  async getById(id: string): Promise<ICampaign | null> {
    const campaign = await this.campaign.findById(id);
    return campaign;
  }

  async getByContactEmail(email: string): Promise<ICampaign | null> {
    const campaign = await this.campaign.findOne({
      contactPerson: email,
    });
    return campaign;
  }

  async create(campaignData: ICampaign): Promise<ICampaign> {
    const campaign = await this.campaign.create(campaignData);
    return campaign;
  }

  async updateById(
    id: string,
    campaignData: Partial<ICampaign>
  ): Promise<ICampaign | null> {
    const campaign = await this.campaign.findByIdAndUpdate(
      id,
      {
        $set: campaignData,
      },
      { new: true }
    );
    return campaign;
  }

  async deleteById(id: string): Promise<ICampaign | null> {
    const campaign = await this.campaign.findByIdAndDelete(id);
    return campaign;
  }
}
