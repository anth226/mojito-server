import mongoose from "mongoose"
import { v4 as uuid } from "uuid"

interface AgencyDocument extends mongoose.Document {
    _id: string
    name: string
    createdAt: Date
    updatedAt: Date
}

const userSchema = new mongoose.Schema<AgencyDocument>(
    {
        _id: {
            type: String,
            default: uuid,
        },
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const AgencyModel = mongoose.model<AgencyDocument>("Agency", userSchema)
