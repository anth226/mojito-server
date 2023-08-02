import mongoose from "mongoose"
import { v4 as uuid } from "uuid"
import * as gql from "../graphql/__generated__/resolvers-types"
import { AdAccount } from "../types"

export interface ConnectionDocument extends mongoose.Document {
    _id: string
    source: gql.ConnectionSource
    status: gql.ConnectionStatus
    accessToken: string
    refreshToken: string
    tokenExpiration: Date
    availableAccounts: Array<AdAccount>
    sourceAccount: string
    agencyId: string
    businessId: string
    clientId: string
    syncedAt: Date
    syncFailedAt: Date
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
        status: {
            type: String,
            default: gql.ConnectionStatus.Ok,
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
        availableAccounts: [
            {
                type: new mongoose.Schema({ name: String, id: String }),
            },
        ],
        sourceAccount: {
            type: String,
        },
        agencyId: {
            type: String,
            index: true,
        },
        businessId: {
            type: String,
            index: true,
        },
        clientId: {
            type: String,
            index: true,
        },
        syncedAt: {
            type: Date,
        },
        syncFailedAt: {
            type: Date,
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
