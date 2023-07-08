import { Request, Response } from "express"
import { ConnectionSource } from "../graphql/__generated__/resolvers-types"
import { MetaApi } from "../core/meta"
import dayjs from "dayjs"

export async function health(_req: Request, res: Response) {
    res.send("OK")
}

export async function googleCallback(req: Request, res: Response) {
    const code = req.query["code"] as string
    const state = req.query["state"] as string

    console.log("google callback")
    console.log(code)
    console.log(state)

    const conn = await req.datasources.connection.getById(state)

    if (!conn) {
        return res.status(401).send("Invalid state token")
    }

    const authClient = await req.core.authFactory.createAndInit(
        conn.source,
        code
    )
    const token = authClient.getToken()

    if (!token) {
        return res.status(500).send("Something went wrong")
    }

    await req.datasources.connection.update(conn._id, {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        tokenExpiration: token.expiration,
    })

    await req.datasources.user.update(conn._id, {})

    res.redirect("https://mojito.online")
}

export async function metaCallback(req: Request, res: Response) {
    const code = req.query["code"] as string
    const state = req.query["state"] as string

    if (!code || !state) {
        return res.status(401).send("Invalid state or code token")
    }

    console.log("meta callback")
    console.log(code)
    console.log(state)

    const conn = await req.datasources.connection.getById(state)

    if (!conn) {
        return res.status(401).send("Invalid state token")
    }

    const authClient = await req.core.authFactory.createAndInit(
        conn.source,
        code
    )
    const token = authClient.getToken()

    if (!token) {
        return res.status(500).send("Something went wrong")
    }

    await req.datasources.connection.update(conn._id, {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        tokenExpiration: token.expiration,
    })

    await req.datasources.user.update(conn._id, {})

    res.redirect("https://mojito.online")
}

export async function testFacebookCalls(req: Request, res: Response) {
    const connection = await req.datasources.connection.getById(
        "41b6cb72-3f23-4ea4-8be8-f6284f1aaaa9"
    )

    if (!connection) {
        return res.status(500).send("Something went wrong")
    }

    const fbClient = await req.core.authFactory.createAndRecover(
        ConnectionSource.Meta,
        {
            accessToken: connection?.accessToken,
            refreshToken: connection?.refreshToken,
            expiration: connection?.tokenExpiration,
        }
    )

    const metaApi = new MetaApi(fbClient)

    const accounts = await metaApi.getAdAccounts()

    console.log(accounts[0])
    console.log(accounts[0])

    const insights = await metaApi.getInsights(
        accounts[0].id,
        dayjs().subtract(100, "day").toDate(),
        dayjs().toDate()
    )

    console.log(insights)

    // let resp = await fbClient
    //     .axios()
    //     .get<{ data: Array<any> }>(
    //         "https://graph.facebook.com/v17.0/me/adaccounts"
    //     )
    // console.log("resp", resp.data.data)

    // const accounts = resp.data.data.map((d) => d.id)

    // let report: any = []
    // for (const acc of accounts) {
    //     const resp = await fbClient
    //         .axios()
    //         .get<any>(`https://graph.facebook.com/v17.0/${acc}/insights`, {
    //             params: {
    //                 fields: "impressions,ad_id,account_name,cpm,ctr,spend,purchase_roas",
    //                 action_attribution_windows: "1d_click,7d_click,1d_view",
    //             },
    //         })
    //     console.log(resp.data)
    //     report = report.concat(resp.data.data)
    // }

    res.json({})
}
