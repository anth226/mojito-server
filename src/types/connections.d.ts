import { ObjectId } from "mongoose"
import { IConnectionDataSource } from "./datasource"
export interface IConnection {
    type: string
    endpoint: string
    client: string
}
// type _d for Mongo document
export interface IConnection_d extends Document {
    id: string
    type: string
    endpoint: string
    client: ObjectId
}

export type ConnectionModel = Model<IConnection_d, object, IConnectionMethods>
export interface IConnectionDataSource {
    getAll(): Promise<IConnection[]>
    getById(id: string): Promise<IConnection | null>
    create(input: IConnection): Promise<IConnection>
    updateById(
        id: string,
        input: Partial<IConnection>
    ): Promise<IConnection | null>
    deleteById(id: string): Promise<IConnection | null>
}
