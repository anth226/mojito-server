import { Request, Response } from "express"
import { MetaApi } from "../core/meta"

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

    const metaApi = new MetaApi(authClient)
    const accounts = await metaApi.getAdAccounts()

    await req.datasources.connection.update(conn._id, {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        tokenExpiration: token.expiration,
        availableAccounts: accounts.map((acc) => ({
            name: acc.name,
            id: acc.id,
        })),
    })

    await req.datasources.user.update(conn._id, {})

    res.redirect("https://mojito.online")
}

export async function stripeWebhook(req: Request, res: Response){
    const sig = req.headers['stripe-signature'];
    let customerDetail
  let event;

  try {
    event = req.core.stripe.webhooks.constructEvent(req.body, sig, process.env.ENDPOINTSECRET);
  }
  catch (err:any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'invoice.payment_succeeded':
     customerDetail = await req.datasources.billing.getDetailsBy("cus_OXZinFRCJBQkdv")
     console.log(customerDetail)
    await req.datasources.history.create({
        title:"professional",
        amount:event.data.object.amount_paid ,
        date: new Date(),
        status:event.data.object.paid,
        downloadInvoice:event.data.object.hosted_invoice_url,
        userId:customerDetail?.clientId,
        invoiceId:event.data.object.id

    })

      break;
    case 'payment_method.attached':
    //   const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});

}