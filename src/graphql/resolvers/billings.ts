import * as gql from "../__generated__/resolvers-types"
import { UNAUTHORIZED_ERROR, UNEXPECTED_ERROR } from "./errors"



export const createSubscription: gql.MutationResolvers["createSubscription"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.CreateSubscriptionPayload | null> => {

    try {
        if (!context.user) {
            throw UNAUTHORIZED_ERROR
        }

        const customer = await context.core.stripe.customers.create({
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
      
          const subscription = await context.core.stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: args.input.priceId }],
          });
        return {
            url:subscription.items.url,
            success:true,
            clientMutationId:args.input.clientMutationId
        }
        
    } catch (error:any) {
            throw UNEXPECTED_ERROR;
    
    }
        
}

export const fetchPlans: gql.QueryResolvers["fetchPlans"] = async (
    _parent,
    _args,
    context,
    _info
): Promise<gql.Plans | null> => {

    const getProductNameById = (productId:string,productData:any):string|null => {
        const filteredProduct = productData.find((product:any) => product.id === productId);
        return filteredProduct ? filteredProduct.name : null;
      };
    
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    const data= await context.core.stripe.plans.list()
    const product= await context.core.stripe.products.list()
    console.log(data)
 const plans =data.data.map((plan:any)=>({
    id:plan.id,
    amount:plan.amount,
    planName:getProductNameById(plan.product,product.data),
    currency:plan.currency,
    interval:plan.interval,
    trialPeriodDays:plan.trial_period_days,
    billingScheme:plan.billing_scheme
}))

 return {plans:plans}
}


