import {
    AccountType,
    UserOrder,
    UserStatus,
} from "../graphql/__generated__/resolvers-types"

export interface UserDatasource {
    create(user: Partial<User>): Promise<User>
    update(id: string, changes: Partial<User>): Promise<User | null>
    getById(id: string): Promise<User | null>
    getByEmail(email: string): Promise<User | null>
    getByAuthState(state: string): Promise<User | null>
    getClientsFrom(agencyId: string): Promise<Array<User>>
    search(query: UserQuery): Promise<[Array<User>, number]>
}

export type User = {
    _id: string
    name: string
    email: string
    password: string
    accountType: AccountType

    // Entity owner of the user
    agencyId: string
    businessId: string

    // Auth state token used for the oauth2 flow
    oauth2State: string

    status: UserStatus

    createdAt: Date
    updatedAt: Date
}

export type UserQuery = {
    ids?: Array<string>
    nameOrEmail?: string
    clientFrom?: string
    agencyId?: string
    businessId?: string
    take?: number
    skip?: number
    orderBy?: UserOrder
}
