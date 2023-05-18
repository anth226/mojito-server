import { Model } from "mongoose";

import DataLoader from "dataloader";
import { IClient } from "../types/client";
import logger from "../utils/logger";

export class ClientDataSource {
  private Client: Model<IClient>;

  constructor({ Client }: { Client: Model<IClient> }) {
    this.Client = Client;
  }

  private batchClients = new DataLoader(async (ids: readonly string[]) => {
    const ClientList = await this.Client.find({ _id: { $in: ids } });
    return ids.map((id) =>
      ClientList.find((Client) => Client._id.toString() === id)
    );
  });

  async getAll(): Promise<IClient[]> {
    const Clients = (await this.Client.find()) as IClient[];
    return Clients;
  }

  async getById(id: string): Promise<IClient | null> {
    const Client = await this.Client.findById(id);
    return Client;
  }

  async getByContactEmail(email: string): Promise<IClient | null> {
    const Client = await this.Client.findOne({ contactPerson: email });
    return Client;
  }

  async create(ClientData: IClient): Promise<IClient> {
    const Client = new this.Client(ClientData);
    logger.info("this is working form Client DAta", Client);
    await Client.save();
    return Client.toObject();
  }

  async updateById(
    id: string,
    clientData: Partial<IClient>
  ): Promise<IClient | null> {
    logger.info(clientData);
    logger.info(id);
    const client = await this.Client.findByIdAndUpdate(
      id,
      {
        $set: clientData,
      },
      { new: true }
    );
    return client;
  }

  async deleteById(id: string): Promise<IClient | null> {
    const Client = await this.Client.findByIdAndDelete(id);
    return Client;
  }
}
