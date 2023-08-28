import { AWS } from "./aws"
import { OAuth2Factory } from "./oauth2"

export type Core = {
    authFactory: OAuth2Factory
    aws: AWS
    stripe:any
}
