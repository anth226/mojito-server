import { Request, Response } from "express"

export async function health(_req: Request, res: Response) {
    res.send("OK")
}

export async function googleCallback(req: Request, res: Response) {
    const code = req.query["code"] as string
    const state = req.query["state"] as string

    console.log(code)
    console.log(state)

    const conn = await req.datasources.connection.getById(state)

    if (!conn) {
        return res.status(401).send("Invalid state token")
    }

    const authClient = await req.core.authFactory.createAndInit(conn.source, code)
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

    console.log("meta callback")
    console.log(code)
    console.log(state)

    const conn = await req.datasources.connection.getById(state)

    if (!conn) {
        return res.status(401).send("Invalid state token")
    }

    const authClient = await req.core.authFactory.createAndInit(conn.source, code)
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
