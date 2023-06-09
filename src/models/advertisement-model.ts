import mongoose from "mongoose"
import { Schema, model } from "mongoose"

import { AdvertisementModel, IAdvertisement_d } from "../types/advertisement"

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
