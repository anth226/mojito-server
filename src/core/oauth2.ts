import axios, { AxiosRequestConfig, AxiosInstance } from "axios"
import dayjs from "dayjs"
import { URL } from "url"
import * as gql from "../graphql/__generated__/resolvers-types"
import * as types from "../types"

const authUrl: Record<gql.ConnectionSource, string> = {
    GOOGLE: "https://accounts.google.com/o/oauth2/v2/auth",
    META: "https://www.facebook.com/v17.0/dialog/oauth",
    TIKTOK: "https://accounts.google.com/o/oauth2/v2/auth",
}

const tokenUrl: Record<gql.ConnectionSource, string> = {
    GOOGLE: "https://oauth2.googleapis.com/token",
    META: "https://graph.facebook.com/v17.0/oauth/access_token",
    TIKTOK: "https://oauth2.googleapis.com/token",
}

const scopes: Record<gql.ConnectionSource, Array<string>> = {
    GOOGLE: [
        "openid",
        "profile",
        "email",
        "https://www.googleapis.com/auth/adwords",
    ],
    META: ["public_profile", "email", "ads_read"],
    TIKTOK: [
        "openid",
        "profile",
        "email",
        "https://www.googleapis.com/auth/adwords",
    ],
}

const redirectUrl: Record<gql.ConnectionSource, string> = {
    GOOGLE: "https://mojito-server-production.up.railway.app/auth/google",
    META: "https://mojito-server-production.up.railway.app/auth/meta/",
    TIKTOK: "https://mojito-server-production.up.railway.app/auth/tiktok",
}

export type OAuth2FactoryConfig = Record<
    gql.ConnectionSource,
    Pick<OAuth2Config, "clientId" | "clientSecret">
>

export type OAuth2Config = {
    clientId: string
    clientSecret: string
    redirectUrl: string
    scopes: Array<string>
    authUrl: string
    tokenUrl: string
}

type Token = {
    accessToken: string
    refreshToken: string
    expiration: Date
}

export class OAuth2Factory {
    constructor(private cfg: OAuth2FactoryConfig) {}

    create(source: gql.ConnectionSource): OAuth2Client {
        return new OAuth2Client({
            clientId: this.cfg[source].clientId,
            clientSecret: this.cfg[source].clientSecret,
            redirectUrl: redirectUrl[source],
            authUrl: authUrl[source],
            tokenUrl: tokenUrl[source],
            scopes: scopes[source],
        })
    }

    async createAndInit(
        source: gql.ConnectionSource,
        code: string
    ): Promise<OAuth2Client> {
        const client = this.create(source)
        await client.initialize(code)
        return client
    }

    async createAndRecover(
        source: gql.ConnectionSource,
        token: Token
    ): Promise<OAuth2Client> {
        const client = this.create(source)
        await client.recover(token)
        return client
    }

    async createFromConnection(conn: types.Connection): Promise<OAuth2Client> {
        const client = this.create(conn.source)
        await client.recover({
            accessToken: conn.accessToken,
            refreshToken: conn.refreshToken,
            expiration: conn.tokenExpiration,
        })
        return client
    }
}

export class OAuth2Client {
    private token?: Token

    constructor(private cfg: OAuth2Config) {}

    public getToken() {
        return this.token
    }

    public authUrl(state: string): string {
        const url = new URL(this.cfg.authUrl)

        url.searchParams.set("client_id", this.cfg.clientId)
        url.searchParams.set("response_type", "code")
        url.searchParams.set("access_type", "offline")
        url.searchParams.set("redirect_uri", this.cfg.redirectUrl)
        url.searchParams.set("scope", this.cfg.scopes.join(" "))
        url.searchParams.set("state", state)

        return url.toString()
    }

    public async initialize(code: string) {
        const url = new URL(this.cfg.tokenUrl)

        url.searchParams.set("client_id", this.cfg.clientId)
        url.searchParams.set("client_secret", this.cfg.clientSecret)
        url.searchParams.set("code", code)
        url.searchParams.set("grant_type", "authorization_code")
        url.searchParams.set("redirect_uri", this.cfg.redirectUrl)

        const resp = await axios
            .post(url.toString(), null, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .catch((error) => {
                console.log(error)
                throw new Error("oauth2: token exchange failed")
            })

        if (resp.status != 200) {
            throw new Error(
                `oauth2: token exchange failed with status ${resp.status}`
            )
        }

        console.log(resp.data)

        this.token = {
            accessToken: resp.data["access_token"],
            refreshToken: resp.data["refresh_token"],
            expiration: dayjs().add(resp.data["expires_in"], "second").toDate(),
        }
    }

    public async recover(token: Token) {
        this.token = token
        await this.tryRefreshToken()
    }

    public axios(config?: AxiosRequestConfig): AxiosInstance {
        return axios.create(this.authorizedAxiosConfig(config))
    }

    private authorizedAxiosConfig(
        config?: AxiosRequestConfig
    ): AxiosRequestConfig {
        const cfg = config || {}

        if (!this.token) return cfg

        if (cfg.headers) {
            cfg.headers.Authorization = `Bearer ${this.token.accessToken}`
        } else {
            cfg.headers = { Authorization: `Bearer ${this.token.accessToken}` }
        }

        if (cfg.params) {
            cfg.params["access_token"] = this.token.accessToken
        } else {
            cfg.params = { access_token: this.token.accessToken }
        }
        return cfg
    }

    private async tryRefreshToken() {
        if (!this.token) {
            throw new Error("oauth2: not initialized")
        }

        if (dayjs(this.token.expiration).add(1, "hour").isAfter(dayjs())) {
            return
        }

        const url = new URL(this.cfg.tokenUrl)

        url.searchParams.set("client_id", this.cfg.clientId)
        url.searchParams.set("client_secret", this.cfg.clientSecret)
        url.searchParams.set("grant_type", "refresh_token")
        url.searchParams.set("refresh_token", this.token.refreshToken)

        const resp = await axios
            .post(url.toString(), null, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .catch((error) => {
                console.log(error)
                throw new Error("oauth2: request to token server failed")
            })

        if (resp.status != 200) {
            throw new Error(
                `oauth2: token exchange failed with status ${resp.status}`
            )
        }

        this.token.accessToken = resp.data["access_token"]
        this.token.expiration = dayjs()
            .add(resp.data["expires_in"], "second")
            .toDate()
    }
}
