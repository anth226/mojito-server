import mongoose from "mongoose"
import { v4 as uuid } from "uuid"
import {
    AlertOperation,
    AlertParameter,
    AlertSeverity,
} from "../graphql/__generated__/resolvers-types"

export interface AlertDocument extends mongoose.Document {
    _id: string
    name: string
    severity: AlertSeverity
    operation: AlertOperation
    parameter: AlertParameter
    value: string
    connectionId: string
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
        connectionId: {
            type: String,
        },
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
    },
    {
        timestamps: true,
    }
)

export const AlertModel = mongoose.model<AlertDocument>("Alert", alertSchema)
