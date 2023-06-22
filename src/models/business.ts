import mongoose from "mongoose"
import { v4 as uuid } from "uuid"

interface BusinessDocument extends mongoose.Document {
    _id: string
    name: string
    createdAt: Date
    updatedAt: Date
}

const userSchema = new mongoose.Schema<BusinessDocument>(
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

export const BusinessModel = mongoose.model<BusinessDocument>(
    "Business",
    userSchema
)
