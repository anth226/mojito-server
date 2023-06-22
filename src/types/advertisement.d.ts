import { IAdvertisementDataSource } from "./datasource"
export interface IAdvertisement {
    name: string
    type: string
    costPerImpression: number
    campaign: string
}

export interface IAdvertisement_d extends Document {
    name: string
    type: string
    costPerImpression: number
    campaign: ObjectId
}

export type AdvertisementModel = Model<IAdvertisement_d, object>

export interface IAdvertisementDataSource {
    getAll(): Promise<IAdvertisement[]>
    getById(id: string): Promise<IAdvertisement | null>
    create(input: IAdvertisement): Promise<IAdvertisement>
    updateById(
        id: string,
        input: Partial<IAdvertisement>
    ): Promise<IAdvertisement | null>
    deleteById(id: string): Promise<IAdvertisement | null>
}
