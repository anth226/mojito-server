import { FilterQuery, QueryOptions } from "mongoose"
import { UserModel, UserDocument } from "../models"
import * as types from "../types/user"
import {
    UserOrderField,
    AccountType,
} from "../graphql/__generated__/resolvers-types"

export class UserDatasource implements types.UserDatasource {
    async getById(id: string): Promise<types.User | null> {
        const user = await UserModel.findById(id)
        return user ? user.toObject() : null
    }

    async update(
        id: string,
        changes: Partial<types.User>
    ): Promise<types.User | null> {
        const user = await UserModel.findByIdAndUpdate(id, changes)
        return user ? user.toObject() : null
    }

    async getByEmail(email: string): Promise<types.User | null> {
        const user = await UserModel.findOne({ email })
        return user ? user.toObject() : null
    }

    async getByAuthState(state: string): Promise<types.User | null> {
        const user = await UserModel.findOne({ oauth2State: state })
        return user ? user.toObject() : null
    }

    async create(user: Partial<types.User>): Promise<types.User> {
        return (await UserModel.create(user)).toObject()
    }

    async getClientsFrom(agencyId: string): Promise<Array<types.User>> {
        const clients = await UserModel.find({
            agencyId: agencyId,
            accountType: AccountType.Client,
        })
        return clients.map((cl) => cl.toObject())
    }

    async search(query: types.UserQuery): Promise<[types.User[], number]> {
        const filter: FilterQuery<UserDocument> = {}
        const options: QueryOptions<UserDocument> = {}

        if (query.ids) {
            filter._id = { $in: query.ids }
        }

        if (query.nameOrEmail) {
            filter.$or = [
                { name: new RegExp(query.nameOrEmail, "gi") },
                { email: new RegExp(query.nameOrEmail, "gi") },
            ]
        }

        if (query.agencyId) {
            filter.agencyId = query.agencyId
        }

        if (query.businessId) {
            filter.businessId = query.businessId
        }

        if (query.clientFrom) {
            filter.agencyId = query.clientFrom
            filter.accountType = AccountType.Client
        }

        if (query.take || query.skip) {
            options.limit = query.take
            options.skip = query.skip
        }

        if (query.orderBy) {
            options.sort = {}
            if (query.orderBy.field == UserOrderField.Name) {
                options.sort.name = query.orderBy.direction.toLowerCase()
            }
            if (query.orderBy.field == UserOrderField.CreatedAt) {
                options.sort.createdAt = query.orderBy.direction.toLowerCase()
            }
        }

        const users = await UserModel.find(filter, null, options)
        const total = await UserModel.count(filter)

        return [users.map((u) => u.toObject()), total]
    }
}
