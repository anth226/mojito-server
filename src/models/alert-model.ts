import mongoose from "mongoose"
import { Schema, model, Model } from "mongoose"
import bcrypt from "bcrypt"

import { IAlert, AlertModel, IAlert_d } from "../types/alerts"

const schema = new Schema<IAlert_d, AlertModel>(
    {
        name: {
            type: String,
            trim: true,
            min: 3,
            max: 80,
            nullable: false,
            message:
                "Invalid Name: Name should more than 3 and less than 80 characters",
        },
        message: {
            type: String,
            trim: true,
            min: 3,
            nullable: false,
            message: "Invalid address: message should more than 3",
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
    },
    { timestamps: true }
)

const Alert = model<IAlert_d, AlertModel>("Alert", schema)

export default Alert
