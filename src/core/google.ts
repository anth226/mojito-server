import { OAuth2Client } from "./oauth2"

export class GoogleApi {
    constructor(private client: OAuth2Client) {}

    async getUserProfile() {
        const resp = await this.client.get(
            "https://openidconnect.googleapis.com/v1/userinfo"
        )

        console.log(resp.data)
    }
}
