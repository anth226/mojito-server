import * as gql from "../graphql/__generated__/resolvers-types"

export interface ConnectionDatasource {
    create(conn: Partial<Connection>): Promise<Connection>
    update(id: string, changes: Partial<Connection>): Promise<Connection | null>
    delete(id: string): Promise<void>
    getById(id: string): Promise<Connection | null>
    search(query: ConnectionQuery): Promise<[Array<Connection>, number]>
}

export type Connection = {
    _id: string

    source: gql.ConnectionSource
    status: gql.ConnectionStatus

    // OAuth2 credentials
    accessToken: string
    refreshToken: string
    tokenExpiration: Date

    availableAccounts: Array<AdAccount>
    sourceAccount: string

    // Entity owner of the connection
    agencyId?: string
    businessId?: string

    // Client that granted the authorization, only relevant for Agency accounts
    clientId?: string

    syncedAt?: Date
    syncFailedAt?: Date
    createdAt: Date
    updatedAt: Date
}

export type AdAccount = {
    name: string
    id: string
}

export type ConnectionQuery = {
    agencyId?: string
    businessId?: string
    take?: number
    skip?: number
    orderBy?: gql.ConnectionOrder
}
