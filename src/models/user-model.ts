import mongoose from "mongoose"
import { v4 as uuid } from "uuid"
import {
    AccountType,
    UserStatus,
} from "../graphql/__generated__/resolvers-types"

export interface UserDocument extends mongoose.Document {
    _id: string
    email: string
    password: string
    name: string
    accountType: AccountType
    agencyId: string
    clientFrom: string
    status: UserStatus
    createdAt: Date
    updatedAt: Date
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        _id: {
            type: String,
            default: uuid,
        },
        email: {
            type: String,
            unique: true,
        },
        name: {
            type: String,
        },
        password: {
            type: String,
        },
        agencyId: {
            type: String,
        },
        clientFrom: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const UserModel = mongoose.model<UserDocument>("User", userSchema)
