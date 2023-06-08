import { Model } from "mongoose"

import DataLoader from "dataloader"
import { IUser } from "../types/user"
import logger from "../utils/logger"

export class UserDataSource {
    private user: Model<IUser>

    constructor({ User }: { User: Model<IUser> }) {
        this.user = User
    }

    private batchusers = new DataLoader(async (ids: readonly string[]) => {
        const userList = await this.user.find({ _id: { $in: ids } })
        return ids.map((id) =>
            userList.find((user) => user._id.toString() === id)
        )
    })

    async getAll(): Promise<IUser[]> {
        const users = (await this.user.find()) as IUser[]
        return users
    }

    async getById(id: string): Promise<IUser | null> {
        const user = await this.user.findById(id)
        return user
    }

    async getByEmail(email: string): Promise<IUser | null> {
        const user = await this.user.findOne({ email })
        return user
    }

    async create(userData: IUser): Promise<IUser> {
        const user = new this.user(userData)
        logger.info("this is working form user DAta", user)
        await user.save()
        return user.toObject()
    }

    async updateById(
        id: string,
        userData: Partial<IUser>
    ): Promise<IUser | null> {
        logger.info(userData)
        const user = await this.user.findByIdAndUpdate(
            id,
            {
                $set: userData,
            },
            { new: true }
        )
        return user
    }

    async deleteById(id: string): Promise<IUser | null> {
        const user = await this.user.findByIdAndDelete(id)
        return user
    }
}
