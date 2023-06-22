import * as types from "../types"
import jwt from "jsonwebtoken"

const JWT_ISSUER = "mojito"
const JWT_EXPIRATION = "7d"

export type JwtPayload = {
    userId: string
}

export async function createAccessToken(
    signingKey: string,
    owner: types.User
): Promise<string> {
    const payload: JwtPayload = {
        userId: owner._id,
    }

    const options: jwt.SignOptions = {
        expiresIn: JWT_EXPIRATION,
        issuer: JWT_ISSUER,
    }

    const token = await new Promise<string>((resolve, reject) => {
        jwt.sign(payload, signingKey, options, (error, encoded) => {
            if (error) {
                reject(error)
                return
            }
            if (!encoded) {
                reject(new Error("Unexpected empty encoded JWT token"))
                return
            }
            resolve(encoded)
        })
    })

    return token
}

export async function isAccessTokenValid(
    signingKey: string,
    accessToken: string
): Promise<boolean> {
    const options: jwt.VerifyOptions = {
        issuer: JWT_ISSUER,
    }

    return new Promise((resolve) => {
        jwt.verify(accessToken, signingKey, options, (error, decoded) => {
            if (error || !decoded) {
                resolve(false)
            }
            resolve(true)
        })
    })
}

export function decodeAccessToken(token: string): JwtPayload | null {
    const payload = jwt.decode(token)
    if (!payload) {
        return null
    }
    return payload as JwtPayload
}
