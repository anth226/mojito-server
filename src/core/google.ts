import { OAuth2Client } from "./oauth2"

const authUrl = "https://accounts.google.com/o/oauth2/v2/auth"
const tokenUrl = "https://oauth2.googleapis.com/token"

const redirectUrl =
    "https://mojito-server-production.up.railway.app/auth/google"

const scopes = [
    "openid",
    "profile",
    "email",
    "https://www.googleapis.com/auth/adwords",
]

export class GoogleAuth {
    constructor(private clientId: string, private clientSecret: string) {}

    authUrl(state: string): string {
        const client = new OAuth2Client({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUrl: redirectUrl,
            authUrl: authUrl,
            tokenUrl: tokenUrl,
            scopes: scopes,
        })

        return client.authUrl(state)
    }

    async exchangeForClient(code: string): Promise<OAuth2Client> {
        const client = new OAuth2Client({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUrl: redirectUrl,
            authUrl: authUrl,
            tokenUrl: tokenUrl,
            scopes: scopes,
        })

        await client.initialize(code)

        return client
    }
}

export class GoogleApi {
    constructor(private client: OAuth2Client) {}

    async getUserProfile() {
        const resp = await this.client.get(
            "https://openidconnect.googleapis.com/v1/userinfo"
        )

        console.log(resp.data)
    }
}
