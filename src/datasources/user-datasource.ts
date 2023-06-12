import { UserModel } from "../models/user-model"
import * as types from "../types/user"

export class UserDatasource implements types.UserDatasource {
    async getById(id: string): Promise<types.User | null> {
        const user = await UserModel.findById(id)
        return user ? user.toObject() : null
    }

    async getByEmail(email: string): Promise<types.User | null> {
        const user = await UserModel.findOne({ email })
        return user ? user.toObject() : null
    }

    async create(user: Partial<types.User>): Promise<types.User> {
        return (await UserModel.create(user)).toObject()
    }

    async getClientsFrom(agencyId: string): Promise<Array<types.User>> {
        const clients = await UserModel.find({
            clientFrom: agencyId,
        })
        return clients.map((cl) => cl.toObject())
    }
}
