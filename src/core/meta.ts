import { OAuth2Client } from "./oauth2"

const baseUrl = "https://graph.facebook.com/v17.0"

export class FacebookApi {
    constructor(private client: OAuth2Client) {}

    async getUserProfile() {
        const resp = await this.client.get(
            "https://openidconnect.googleapis.com/v1/userinfo"
        )

        console.log(resp.data)
    }
}
