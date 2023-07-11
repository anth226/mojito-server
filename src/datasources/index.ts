import mongoose from "mongoose"
import logger from "../utils/logger"

export async function connectIfNecessary(url: string): Promise<void> {
    if (mongoose.connection && mongoose.connection.db) {
        try {
            const pingResult = await mongoose.connection.db.admin().ping()

            if (pingResult?.ok === 1) {
                return
            }
        } catch (error) {
            logger.error(`Database ping failed: ${error}`)
        }
    }

    await mongoose.connect(url)
}

mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection failed")
)

export * from "./user"
export * from "./agency"
export * from "./connection"
export * from "./business"
export * from "./alert"
export * from "./metric"
