import { Model } from "mongoose";

import DataLoader from "dataloader";
import { IConnection } from "../types/connections";
import logger from "../utils/logger";

export class ConnectionDataSource {
  private Connection: Model<IConnection>;

  constructor({ Connection }: { Connection: Model<IConnection> }) {
    this.Connection = Connection;
  }

  private batchConnections = new DataLoader(async (ids: readonly string[]) => {
    const ConnectionList = await this.Connection.find({
      _id: { $in: ids },
    });
    return ids.map((id) =>
      ConnectionList.find((Connection) => Connection._id.toString() === id)
    );
  });

  async getAll(): Promise<IConnection[]> {
    const connections = (await this.Connection.find()) as IConnection[];
    return connections;
  }

  async getById(id: string): Promise<IConnection | null> {
    const connection = await this.Connection.findById(id);
    return connection;
  }

  async getByContactEmail(email: string): Promise<IConnection | null> {
    const connection = await this.Connection.findOne({
      contactPerson: email,
    });
    return connection;
  }

  async create(connectionData: IConnection): Promise<IConnection> {
    const connection = await this.Connection.create(connectionData);
    return connection;
  }

  async updateById(
    id: string,
    connectionData: Partial<IConnection>
  ): Promise<IConnection | null> {
    logger.info(connectionData);
    logger.info(id);
    const connection = await this.Connection.findByIdAndUpdate(
      id,
      {
        $set: connectionData,
      },
      { new: true }
    );
    return connection;
  }

  async deleteById(id: string): Promise<IConnection | null> {
    const Connection = await this.Connection.findByIdAndDelete(id);
    return Connection;
  }
}
