import mongoose, { Mongoose } from "mongoose"
import { Schema, model, Model } from "mongoose"
import bcrypt from "bcrypt"

import { ISpending, SpendingModel, ISpending_d } from "../types/spending"
import { type } from "os"

const schema = new Schema<ISpending_d, SpendingModel>(
    {
        date: { type: String, nullable: false },
        amount: { type: Number, default: 0 },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "campaign",
        },
    },
    { timestamps: true }
)

const Spending = model<ISpending_d, SpendingModel>("Spending", schema)

export default Spending
