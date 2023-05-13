import { Model } from "mongoose";

import DataLoader from "dataloader";
import { IAgency } from "../types/agency";
import logger from "../utils/logger";

export class AgencyDataSource {
  private Agency: Model<IAgency>;

  constructor({ Agency }: { Agency: Model<IAgency> }) {
    this.Agency = Agency;
  }

  private batchAgencys = new DataLoader(async (ids: readonly string[]) => {
    const AgencyList = await this.Agency.find({ _id: { $in: ids } }).lean();
    return ids.map((id) =>
      AgencyList.find((Agency) => Agency._id.toString() === id)
    );
  });

  async getAll(): Promise<IAgency[]> {
    const Agencys = (await this.Agency.find()) as IAgency[];
    return Agencys;
  }

  async getById(id: string): Promise<IAgency | null> {
    const Agency = await this.Agency.findById(id).lean();
    return Agency;
  }

  async getByContactEmail(email: string): Promise<IAgency | null> {
    const Agency = await this.Agency.findOne({ contactPerson: email }).lean();
    return Agency;
  }

  async create(AgencyData: IAgency): Promise<IAgency> {
    const Agency = new this.Agency(AgencyData);
    logger.info("this is working form Agency DAta", Agency);
    await Agency.save();
    return Agency.toObject();
  }

  async updateById(
    id: string,
    agencyData: Partial<IAgency>
  ): Promise<IAgency | null> {
    logger.info(agencyData);
    const Agency = await this.Agency.findByIdAndUpdate(
      id,
      {
        $set: agencyData,
      },
      { new: true }
    );
    return Agency;
  }

  async deleteById(id: string): Promise<IAgency | null> {
    const Agency = await this.Agency.findByIdAndDelete(id).lean();
    return Agency;
  }
}
