import {
    AlertOperation,
    AlertOrder,
} from "../graphql/__generated__/resolvers-types"

export interface AlertDatasource {
    create(alert: Partial<Alert>): Promise<Alert>
    update(id: string, changes: Partial<Alert>): Promise<Alert | null>
    getById(id: string): Promise<Alert | null>
    search(query: AlertQuery): Promise<[Array<Alert>, number]>
}

export type Alert = {
    _id: string
    name: string
    operation: AlertOperation
    parameter: string
    value: string
    connectionId: string
    agencyId: string
    businessId: string
    archived: boolean
    createdAt: Date
    updatedAt: Date
}

export type AlertQuery = {
    name?: string
    archived?: boolean
    connectionId?: string
    agencyId?: string
    businessId?: string
    take?: number
    skip?: number
    orderBy?: AlertOrder
}
