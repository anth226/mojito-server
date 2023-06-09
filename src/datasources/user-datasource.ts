import { UserModel } from "../models/user-model"
import { UserDatasource, User } from "../types/user"

export class UserDataSource implements UserDatasource {
    async getById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id)
        return user ? user.toObject() : null
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email })
        return user ? user.toObject() : null
    }

    async create(user: Partial<User>): Promise<User> {
        return (await UserModel.create(user)).toObject()
    }
}
