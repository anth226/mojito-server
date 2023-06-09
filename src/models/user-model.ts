import mongoose from "mongoose"

interface UserDocument extends mongoose.Document {
    email: string
    password: string
    name: string
    accountType: string
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
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
    },
    {
        timestamps: true,
    }
)

export const UserModel = mongoose.model<UserDocument>("User", userSchema)
