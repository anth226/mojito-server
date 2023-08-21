import * as gql from "../__generated__/resolvers-types"
import { UNAUTHORIZED_ERROR } from "./errors"

const stripe = require('stripe')('sk_test_51Mfw0UFvL0m5gmDoGFSyOfdEqpBTlb6d96I0i6jPYjypSy0UnR9OJgHoWZlyyIIKMI9wU9g109fzLkqQoecaEnnZ00Cqff2bdw');


export const createSubscription: gql.MutationResolvers["createSubscription"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.CreateSubscriptionPayload | null> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }
    const customer = await stripe.customers.create({
        email:args.input.email,
        source: args.input.source,
        name: args.input.name,
      });

      const billingDetail = await context.datasources.billing.create({
        email:args.input.email,
        name:args.input.name,
        clientId:args.input.clientId,
        customerId:customer.id,
        cardId:customer.default_source,
        phone:args.input.phone,
        expiry:args.input.expiry,
        card:args.input.card,
        street:args.input.street,
        country_code:args.input.country_code,
        apt_suit_number:args.input.apt_suit_number,
        region:args.input.region,
        state:args.input.state,
        city:args.input.city,
        zip_code:args.input.zip_code,


      })
 console.log(billingDetail)

  
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: args.input.priceId }],
      });

     
     console.log(subscription);
    return {
        url:"https://www.google.com",
        success:true,
        clientMutationId:"1"
    }


    
}

export const fetchPlans: gql.QueryResolvers["fetchPlans"] = async (
    _parent,
    _args,
    context,
    _info
): Promise<gql.Plans | null> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    const data= await stripe.plans.list()

    console.log(data.data);

    
 const plans =data.data.map((plan:any)=>({
    id:plan.id,
    amount:plan.amount,
    planName:"starter",
    currency:plan.currency,
}))

 return {plans:plans}
}


