import { Model } from "mongoose";

import DataLoader from "dataloader";
import logger from "../utils/logger";
import { IImpression } from "../types/impression";

export class ImpressionDataSource {
  private impression: Model<IImpression>;

  constructor({ Impression }: { Impression: Model<IImpression> }) {
    this.impression = Impression;
  }

  private batchImpressions = new DataLoader(async (ids: readonly string[]) => {
    const impressionList = await this.impression.find({
      _id: { $in: ids },
    });

    return ids.map((id) =>
      impressionList.find((impression) => impression._id.toString() === id)
    );
  });

  async getAll(): Promise<IImpression[]> {
    const alerts = (await this.impression.find()) as IImpression[];
    return alerts;
  }

  async getById(id: string): Promise<IImpression | null> {
    const impression = await this.impression.findById(id);
    return impression;
  }

  async getByContactEmail(email: string): Promise<IImpression | null> {
    const impression = await this.impression.findOne({
      contactPerson: email,
    });
    return impression;
  }

  async create(ImpressionData: IImpression): Promise<IImpression> {
    logger.info("this is working form Impression DAta", ImpressionData);
    const impressionData = new this.impression(ImpressionData);

    await impressionData.save();
    return impressionData.toObject();
  }

  async updateById(
    id: string,
    input: Partial<IImpression>
  ): Promise<IImpression | null> {
    logger.info(input);
    const impression = await this.impression.findByIdAndUpdate(
      id,
      {
        $set: input,
      },
      { new: true }
    );
    return impression;
  }

  async deleteById(id: string): Promise<IImpression | null> {
    const impression = await this.impression.findByIdAndDelete(id);
    return impression;
  }
}
