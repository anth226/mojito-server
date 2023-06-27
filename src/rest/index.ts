import { Request, Response } from "express"

export async function health(req: Request, res: Response) {
    res.send("OK")
}

export async function googleCallback(req: Request, res: Response) {
    console.log(req.body)

    res.redirect("https://mojito.online")
}
