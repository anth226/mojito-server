import {
    ConnectionOrder,
    ConnectionSource,
} from "../graphql/__generated__/resolvers-types"

export interface ConnectionDatasource {
    create(conn: Partial<Connection>): Promise<Connection>
    update(id: string, changes: Partial<Connection>): Promise<Connection | null>
    delete(id: string): Promise<void>
    getById(id: string): Promise<Connection | null>
    search(query: ConnectionQuery): Promise<[Array<Connection>, number]>
}

export type Connection = {
    _id: string

    source: ConnectionSource

    // OAuth2 credentials
    accessToken: string
    refreshToken: string
    tokenExpiration: Date

    // Entity owner of the connection
    agencyId?: string
    businessId?: string

    // Client that granted the authorization, only relevant for Agency accounts
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
