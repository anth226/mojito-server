import mongoose, { Mongoose } from "mongoose"
import { Schema, model, Model } from "mongoose"
import bcrypt from "bcrypt"

import {
    IImpression,
    ImpressionModel,
    IImpression_d,
} from "../types/impression"
import { type } from "os"

const schema = new Schema<IImpression_d, ImpressionModel>(
    {
        date: { type: String, nullable: false },
        count: { type: Number, default: 0 },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "campaign",
        },
    },
    { timestamps: true }
)

const Impression = model<IImpression_d, ImpressionModel>("Impression", schema)

export default Impression
