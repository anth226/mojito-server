import mongoose from "mongoose"
import { v4 as uuid } from "uuid"
import { ConnectionSource } from "../graphql/__generated__/resolvers-types"

export interface ConnectionDocument extends mongoose.Document {
    _id: string
    source: ConnectionSource
    accessToken: string
    refreshToken: string
    tokenExpiration: Date
    agencyId: string
    businessId: string
    clientId: string
    createdAt: Date
    updatedAt: Date
}

const connectionSchema = new mongoose.Schema<ConnectionDocument>(
    {
        _id: {
            type: String,
            default: uuid,
        },
        source: {
            type: String,
        },
        accessToken: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        tokenExpiration: {
            type: Date,
        },
        agencyId: {
            type: String,
        },
        businessId: {
            type: String,
        },
        clientId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

export const ConnectionModel = mongoose.model<ConnectionDocument>(
    "Connection",
    connectionSchema
)
