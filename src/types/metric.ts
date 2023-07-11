import * as gql from "../graphql/__generated__/resolvers-types"

export interface MetricDatasource {
    createMany(metrics: Array<Partial<Metric>>): Promise<Array<Metric>>
    update(id: string, changes: Partial<Metric>): Promise<Metric | null>
    getById(id: string): Promise<Metric | null>
    search(query: MetricQuery): Promise<[Array<Metric>, number]>
}

export type Metric = {
    _id: string
    type: gql.MetricType
    value: number
    from: Date
    to: Date
    connectionId: string
    agencyId: string
    businessId: string
    createdAt: Date
}

export type MetricQuery = {
    connectionId?: string
    agencyId?: string
    businessId?: string
    take?: number
    skip?: number
    orderBy?: gql.MetricOrder
}
