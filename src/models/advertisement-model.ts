import mongoose, { Mongoose } from "mongoose"
import { Schema, model, Model } from "mongoose"
import bcrypt from "bcrypt"

import {
    IAdvertisement,
    AdvertisementModel,
    IAdvertisement_d,
} from "../types/advertisement"
import { type } from "os"

const schema = new Schema<IAdvertisement_d, AdvertisementModel>(
    {
        name: { type: String, min: 3, max: 80, nullable: false },

        type: { type: String, nullable: false },
        costPerImpression: { type: Number, default: 0 },
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "campaign",
        },
    },
    { timestamps: true }
)

const Advertisement = model<IAdvertisement_d, AdvertisementModel>(
    "Advertisement",
    schema
)

export default Advertisement
