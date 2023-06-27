import { URL } from "url"

const authBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth"

const redirectUrl =
    "https://mojito-server-production.up.railway.app/auth/google"

const scopes = [
    "openid",
    "profile",
    "email",
    "https://www.googleapis.com/auth/adwords",
]

export class Google {
    constructor(private clientId: string, private clientSecret: string) {}

    public authUrl(state: string): string {
        const url = new URL(authBaseUrl)

        url.searchParams.set("client_id", this.clientId)
        url.searchParams.set("response_type", "code")
        url.searchParams.set("redirect_uri", redirectUrl)
        url.searchParams.set("scope", scopes.join(" "))
        url.searchParams.set("state", state)

        return url.toString()
    }
}
