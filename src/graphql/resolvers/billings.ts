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
    
          
      
          const subscription = await context.core.stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: args.input.priceId }],
          });
           await context.core.stripe.subscriptionItems.createUsageRecord(
            subscription.items.data[0].id,
            {
              quantity:args.input.quantity ,
              timestamp: Math.floor(Date.now() / 1000),
              action: 'set',
            }
          );
           await context.datasources.billing.create({
            cardBrand:args.input.cardBrand,
            email:args.input.email,
            name:args.input.name,
            clientId:args.input.clientId,
            customerId:customer.id,
            cardId:customer.default_source,
            phone:args.input.phone,
            expiry:args.input.expiry,
            subscriptionId:subscription.id,
            quantity:args.input.quantity,
            card:args.input.card,
            street:args.input.street,
            country_code:args.input.country_code,
            apt_suit_number:args.input.apt_suit_number,
            region:args.input.region,
            state:args.input.state,
            city:args.input.city,
            zip_code:args.input.zip_code,
    
    
          })
          const invoice = await context.core.stripe.invoices.retrieve(
            subscription.latest_invoice
          );

          await context.datasources.history.create({
            title: args.input.billingPlan,
            amount:invoice.amount_paid ,
            date: new Date(),
            status:invoice.paid,
            downloadInvoice:invoice.hosted_invoice_url,
            userId:args.input.clientId,
            invoiceId:subscription.latest_invoice

        })
        return {
            url:invoice.hosted_invoice_url,
            success:true,
            clientMutationId:args.input.clientMutationId
        }
        
    } catch (error:any) {
        if (error.type==="StripeInvalidRequestError"){
            throw new Error(error.raw.message)
        }
        else{
            throw UNEXPECTED_ERROR;
        }
    
    }
        
}

export const fetchPlans: gql.QueryResolvers["fetchPlans"] = async (
    _parent,
    _args,
    context,
    _info
): Promise<gql.Plans | null> => {

    const getPlanById = (planId:string,planData:any) => {
        const filteredPlan = planData.find((plan:any) => plan.id === planId);
        return filteredPlan ? filteredPlan : null;
      };
    
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    const plans= await context.core.stripe.plans.list({ active: true })
    const product= await context.core.stripe.products.list({ active: true })
    const prices =await context.core.stripe.prices.list({ active: true })

 const plansData =product.data.map((product:any)=>({
    id:product.default_price,
    amount:getPlanById(product.default_price,plans.data).amount_decimal,
    planName:product.name,
    currency:getPlanById(product.default_price,plans.data).currency,
    interval:getPlanById(product.default_price,plans.data).interval,
    trialPeriodDays:getPlanById(product.default_price,plans.data).trial_period_days,
    billingScheme:getPlanById(product.default_price,plans.data).billing_scheme
}))

 return {plans:plansData}
}


