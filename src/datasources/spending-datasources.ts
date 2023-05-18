import { Model } from "mongoose";

import DataLoader from "dataloader";
import logger from "../utils/logger";
import { ISpending } from "../types/spending";

export class SpendingDataSource {
  private spending: Model<ISpending>;

  constructor({ Spending }: { Spending: Model<ISpending> }) {
    this.spending = Spending;
  }

  private batchSpendings = new DataLoader(async (ids: readonly string[]) => {
    const spendingList = await this.spending.find({
      _id: { $in: ids },
    });
    return ids.map((id) =>
      spendingList.find((spending) => spending._id.toString() === id)
    );
  });

  async getAll(): Promise<ISpending[]> {
    const alerts = (await this.spending.find()) as ISpending[];
    return alerts;
  }

  async getById(id: string): Promise<ISpending | null> {
    const spending = await this.spending.findById(id);
    return spending;
  }

  async getByContactEmail(email: string): Promise<ISpending | null> {
    const spending = await this.spending.findOne({
      contactPerson: email,
    });
    return spending;
  }

  async create(SpendingData: ISpending): Promise<ISpending> {
    logger.info("this is working form Spending DAta", SpendingData);
    const spendingData = new this.spending(SpendingData);

    await spendingData.save();
    return spendingData.toObject();
  }

  async updateById(
    id: string,
    input: Partial<ISpending>
  ): Promise<ISpending | null> {
    logger.info(input);
    const spending = await this.spending.findByIdAndUpdate(
      id,
      {
        $set: input,
      },
      { new: true }
    );
    return spending;
  }

  async deleteById(id: string): Promise<ISpending | null> {
    const spending = await this.spending.findByIdAndDelete(id);
    return spending;
  }
}
