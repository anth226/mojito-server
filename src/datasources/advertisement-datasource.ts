import { Model } from "mongoose";

import DataLoader from "dataloader";
import logger from "../utils/logger";
import { IAdvertisement } from "../types/advertisement";

export class AdvertisementDataSource {
  private Advertisement: Model<IAdvertisement>;

  constructor({ Advertisement }: { Advertisement: Model<IAdvertisement> }) {
    this.Advertisement = Advertisement;
  }

  private batchAdvertisements = new DataLoader(
    async (ids: readonly string[]) => {
      const AdvertisementList = await this.Advertisement.find({
        _id: { $in: ids },
      });
      return ids.map((id) =>
        AdvertisementList.find(
          (Advertisement) => Advertisement._id.toString() === id
        )
      );
    }
  );

  async getAll(): Promise<IAdvertisement[]> {
    const alerts = (await this.Advertisement.find()) as IAdvertisement[];
    return alerts;
  }

  async getById(id: string): Promise<IAdvertisement | null> {
    const Advertisement = await this.Advertisement.findById(id);
    return Advertisement;
  }

  async getByContactEmail(email: string): Promise<IAdvertisement | null> {
    const Advertisement = await this.Advertisement.findOne({
      contactPerson: email,
    });
    return Advertisement;
  }

  async create(AdvertisementData: IAdvertisement): Promise<IAdvertisement> {
    logger.info("this is working form Advertisement DAta", AdvertisementData);
    const advertisementData = new this.Advertisement(AdvertisementData);

    await advertisementData.save();
    return advertisementData.toObject();
  }

  async updateById(
    id: string,
    alertData: Partial<IAdvertisement>
  ): Promise<IAdvertisement | null> {
    logger.info(alertData);
    const advertisement = await this.Advertisement.findByIdAndUpdate(
      id,
      {
        $set: alertData,
      },
      { new: true }
    );
    return advertisement;
  }

  async deleteById(id: string): Promise<IAdvertisement | null> {
    const Advertisement = await this.Advertisement.findByIdAndDelete(id);
    return Advertisement;
  }
}
