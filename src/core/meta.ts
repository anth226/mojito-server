import { AxiosRequestConfig } from "axios"
import { OAuth2Client } from "./oauth2"
import dayjs from "dayjs"

const API_URL = "https://graph.facebook.com/v17.0"

type ApiResponse<T> = {
    data: T
    paging: {
        cursors: {
            before: string
            after: string
        }
        next?: string
    }
}

type AdAccount = {
    id: string
    account_id: string
    name: string
    business_name: string
    age: number
}

type Insight = {
    cpm: string
    ctr: string
    spend: string
    clicks: string
    date_start: string
    date_stop: string
}

export class MetaApi {
    constructor(private client: OAuth2Client) {}

    async getAdAccounts(): Promise<Array<AdAccount>> {
        return this.getPaginated<AdAccount>(`${API_URL}/me/adaccounts`, {
            params: {
                fields: "account_id,name,business_name,age",
                limit: 50,
            },
        })
    }

    async getInsights(
        adAccountId: string,
        from: Date,
        to: Date
    ): Promise<Array<Insight>> {
        const since = dayjs.utc(from).format("YYYY-MM-DD")
        const until = dayjs.utc(to).format("YYYY-MM-DD")

        return this.getPaginated<Insight>(
            `${API_URL}/${adAccountId}/insights`,
            {
                params: {
                    fields: "impressions,ad_id,account_name,clicks,cpm,ctr,spend,purchase_roas",
                    time_increment: 1,
                    time_range: `{"since":"${since}","until":"${until}"}`,
                    action_attribution_windows: "1d_click,7d_click,1d_view",
                    limit: 50,
                },
            }
        )
    }

    private async getPaginated<T>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Array<T>> {
        let resp = await this.client
            .axios()
            .get<ApiResponse<Array<T>>>(url, config)
        let objects = resp.data.data

        while (resp.data.paging.next) {
            resp = await this.client.axios().get(resp.data.paging.next)
            objects = objects.concat(resp.data.data)
        }

        return objects
    }
}
