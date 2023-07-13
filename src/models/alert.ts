import mongoose from "mongoose"
import { v4 as uuid } from "uuid"
import * as gql from "../graphql/__generated__/resolvers-types"

export interface AlertDocument extends mongoose.Document {
    _id: string
    name: string
    severity: gql.AlertSeverity
    operation: gql.AlertOperation
    parameter: gql.AlertParameter
    value: string
    fires: number
    clientIds: string[]
    agencyId: string
    businessId: string
    archived: boolean
    createdAt: Date
    updatedAt: Date
}

const alertSchema = new mongoose.Schema<AlertDocument>(
    {
        _id: {
            type: String,
            default: uuid,
        },
        name: {
            type: String,
        },
        severity: {
            type: String,
            default: gql.AlertSeverity.Normal,
        },
        operation: {
            type: String,
        },
        parameter: {
            type: String,
        },
        value: {
            type: String,
        },
        clientIds: [
            {
                type: String,
            },
        ],
        agencyId: {
            type: String,
        },
        businessId: {
            type: String,
        },
        archived: {
            type: Boolean,
            default: false,
        },
        fires: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

export const AlertModel = mongoose.model<AlertDocument>("Alert", alertSchema)
