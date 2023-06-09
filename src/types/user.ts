import { AccountType } from "../graphql/__generated__/resolvers-types"

export interface UserDatasource {
    create(user: Partial<User>): Promise<User>
    getById(id: string): Promise<User | null>
    getByEmail(email: string): Promise<User | null>
}

export type User = {
    _id: string
    name: string
    email: string
    password: string
    accountType: AccountType
    createdAt: Date
}
