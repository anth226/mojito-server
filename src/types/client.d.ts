import { IClientDataSource } from "./datasource"

export interface IClient {
    name: string
    address: string
    contactPerson: string
    agency: string
    contactEmail: string
}
// types suffix _d are for Mongo document
export interface IClient_d extends Document {
    id: string
    name: string
    address: string
    agency: ObjectId
    contactPerson: string
    contactEmail: string
}

export type ClientModel = Model<IClient_d, object, IClientMethods>

export interface IClientDataSource {
    getAll(): Promise<IClient[]>
    getById(id: string): Promise<IClient | null>
    getByContactEmail(email: string): Promise<IClient | null>
    create(input: IClient): Promise<IClient>
    updateById(id: string, input: Partial<IClient>): Promise<IClient | null>
    deleteById(id: string): Promise<IClient | null>
}
