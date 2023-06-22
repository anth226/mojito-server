import {
    ConnectionOrder,
    ConnectionSource,
} from "../graphql/__generated__/resolvers-types"

export interface ConnectionDatasource {
    create(conn: Partial<Connection>): Promise<Connection>
    getById(id: string): Promise<Connection | null>
    search(query: ConnectionQuery): Promise<[Array<Connection>, number]>
}

export type Connection = {
    _id: string
    source: ConnectionSource
    secretKey: string
    agencyId?: string
    businessId?: string
    clientId?: string
    createdAt: Date
    updatedAt: Date
}

export type ConnectionQuery = {
    agencyId?: string
    businessId?: string
    take?: number
    skip?: number
    orderBy?: ConnectionOrder
}
