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
            index: true,
        },
        to: {
            type: Date,
            index: true,
        },
        connectionId: {
            type: String,
            index: true,
        },
        agencyId: {
            type: String,
            index: true,
        },
        businessId: {
            type: String,
            index: true,
        },
    },
    {
        timestamps: true,
    }
)

metricSchema.index({ agencyId: 1, business: 1, from: 1, to: 1 })

export const MetricModel = mongoose.model<MetricDocument>(
    "Metric",
    metricSchema
)
