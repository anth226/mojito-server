import * as gql from "../__generated__/resolvers-types"
import { UNAUTHORIZED_ERROR, UNEXPECTED_ERROR } from "./errors"
import { getPlanById,getPriceById,filterPlanByUser } from "../../utils/filters"
import { AccountType } from "../__generated__/resolvers-types"

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
        

        let quantity=0;
        if(context.user.accountType===AccountType.Agency){

          const clients=await context.datasources.user.getActiveClientsFrom(context.user.agencyId)
          quantity=clients.length
      }else{
          const connections = await context.datasources.connection.getAllConnectionsFor(context.user.businessId)
          quantity =connections.length
      }
        const customer = await context.core.stripe.customers.create({
            email:args.input.email,
            source: args.input.source,
            name: args.input.name,
          });

          const subscription = await context.core.stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: args.input.priceId }],
          });
           await context.core.stripe.subscriptionItems.createUsageRecord(
            subscription.items.data[0].id,
            {
              quantity:quantity,
              timestamp: Math.floor(Date.now() / 1000),
              action: 'set',
            }
          );
           await context.datasources.billing.create({
            cardBrand:args.input.cardBrand,
            email:args.input.email,
            name:args.input.name,
            clientId:context.user._id,
            customerId:customer.id,
            cardId:customer.default_source,
            phone:args.input.phone,
            expiry:args.input.expiry,
            subscriptionId:subscription.id,
            quantity:quantity,
            card:args.input.card,
            street:args.input.street,
            country_code:args.input.country_code,
            apt_suit_number:args.input.apt_suit_number,
            region:args.input.region,
            state:args.input.state,
            city:args.input.city,
            zip_code:args.input.zip_code,
    
    
          })
          await context.datasources.history.updateBy(subscription.latest_invoice,{userId:context.user._id
          })

        return {
            url:"",
            reason:"Subscription created successfully",
            success:true,
            clientMutationId:args.input.clientMutationId
        }
        
    } catch (error:any) {
        if (error.type==="StripeInvalidRequestError"){
            context.logger.error(error.raw.message)
            return {
            reason:error.raw.message,
            success:false,
            clientMutationId:args.input.clientMutationId
        }
        }
        else{
            context.logger.error(error.message)
            return {
                reason:"Payment was Unsuccessfull.",
                success:false,
                clientMutationId:args.input.clientMutationId
            }
        }
    
    }
        
}

export const fetchPlans: gql.QueryResolvers["fetchPlans"] = async (
    _parent,
    _args,
    context,
    _info
): Promise<gql.Plans | null> => {
    try {
            
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }
    const plans= await context.core.stripe.plans.list({ active: true , expand: ['data.tiers']})
    const product= await context.core.stripe.products.list({ active: true })

    const plansData =product.data.map((product:any)=>({
    id:product.default_price,
    amount:getPlanById(product.default_price,plans.data).amount_decimal?
    parseFloat( getPlanById(product.default_price,plans.data).amount_decimal)/100: parseFloat(getPriceById(product.default_price,plans.data))/100,
    description:product.description,
    planName:product.name +" plan",
    currency:getPlanById(product.default_price,plans.data).currency,
    interval:getPlanById(product.default_price,plans.data).interval,
    trialPeriodDays:getPlanById(product.default_price,plans.data).trial_period_days,
    billingScheme:getPlanById(product.default_price,plans.data).billing_scheme
}))

 return {plans:filterPlanByUser(context.user.accountType,plansData)}
} catch (error:any) {
 throw new Error(error.message)
}
}


