import mongoose from "mongoose"
import { v4 as uuid } from "uuid"
import * as gql from "../graphql/__generated__/resolvers-types"

export interface MetricDocument extends mongoose.Document {
    _id: string
    type: gql.MetricType
    value: number
    from: Date
    to: Date
    connectionId: string
    agencyId: string
    businessId: string
    createdAt: Date
}

const metricSchema = new mongoose.Schema<MetricDocument>(
    {
        _id: {
            type: String,
            default: uuid,
        },
        type: {
            type: String,
        },
        value: {
            type: Number,
        },
        from: {
            type: Date,
        },
        to: {
            type: Date,
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
    },
    {
        timestamps: true,
    }
)

export const MetricModel = mongoose.model<MetricDocument>(
    "Metric",
    metricSchema
)
