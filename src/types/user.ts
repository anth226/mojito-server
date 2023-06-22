import {
    AccountType,
    UserOrder,
    UserStatus,
} from "../graphql/__generated__/resolvers-types"

export interface UserDatasource {
    create(user: Partial<User>): Promise<User>
    getById(id: string): Promise<User | null>
    getByEmail(email: string): Promise<User | null>
    getClientsFrom(agencyId: string): Promise<Array<User>>
    search(query: UserQuery): Promise<[Array<User>, number]>
}

export type User = {
    _id: string
    name: string
    email: string
    password: string
    accountType: AccountType
    agencyId: string
    businessId: string
    clientFrom: string
    status: UserStatus
    createdAt: Date
    updatedAt: Date
}

export type UserQuery = {
    nameOrEmail?: string
    clientFrom?: string
    agencyId?: string
    businessId?: string
    take?: number
    skip?: number
    orderBy?: UserOrder
}
