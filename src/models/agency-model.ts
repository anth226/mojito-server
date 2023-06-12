import mongoose from "mongoose"

interface AgencyDocument extends mongoose.Document {
    name: string
}

const userSchema = new mongoose.Schema<AgencyDocument>(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const AgencyModel = mongoose.model<AgencyDocument>("Agency", userSchema)
