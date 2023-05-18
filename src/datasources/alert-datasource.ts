import { Model } from "mongoose";

import DataLoader from "dataloader";
import logger from "../utils/logger";
import { IAlert } from "../types/alerts";

export class AlertDataSource {
  private Alert: Model<IAlert>;

  constructor({ Alert }: { Alert: Model<IAlert> }) {
    this.Alert = Alert;
  }

  private batchAlerts = new DataLoader(async (ids: readonly string[]) => {
    const AlertList = await this.Alert.find({ _id: { $in: ids } });
    return ids.map((id) =>
      AlertList.find((Alert) => Alert._id.toString() === id)
    );
  });

  async getAll(): Promise<IAlert[]> {
    const alerts = (await this.Alert.find()) as IAlert[];
    return alerts;
  }

  async getById(id: string): Promise<IAlert | null> {
    const Alert = await this.Alert.findById(id);
    return Alert;
  }

  async getByContactEmail(email: string): Promise<IAlert | null> {
    const Alert = await this.Alert.findOne({ contactPerson: email });
    return Alert;
  }

  async create(AlertData: IAlert): Promise<IAlert> {
    const Alert = new this.Alert(AlertData);
    logger.info("this is working form Alert DAta", Alert);
    await Alert.save();
    return Alert.toObject();
  }

  async updateById(
    id: string,
    alertData: Partial<IAlert>
  ): Promise<IAlert | null> {
    logger.info(alertData);
    const Alert = await this.Alert.findByIdAndUpdate(
      id,
      {
        $set: alertData,
      },
      { new: true }
    );
    return Alert;
  }

  async deleteById(id: string): Promise<IAlert | null> {
    const Alert = await this.Alert.findByIdAndDelete(id);
    return Alert;
  }
}
