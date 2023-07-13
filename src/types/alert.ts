import * as gql from "../graphql/__generated__/resolvers-types"

export interface AlertDatasource {
    create(alert: Partial<Alert>): Promise<Alert>
    update(id: string, changes: Partial<Alert>): Promise<Alert | null>
    getById(id: string): Promise<Alert | null>
    search(query: AlertQuery): Promise<[Array<Alert>, number]>
}

export type Alert = {
    _id: string
    name: string
    severity: gql.AlertSeverity
    operation: gql.AlertOperation
    parameter: gql.AlertParameter
    value: string
    fires: number
    clientIds: Array<string>
    agencyId: string
    businessId: string
    archived: boolean
    createdAt: Date
    updatedAt: Date
}

export type AlertQuery = {
    name?: string
    archived?: boolean
    clientIds?: string
    agencyId?: string
    businessId?: string
    take?: number
    skip?: number
    orderBy?: gql.AlertOrder
}
