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
            address: {
                line1: args.input.street,
                city: args.input.city,
                postal_code: args.input.zip_code,
                state: args.input.state,
                country: args.input.region,
              },
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
            plan: args.input.billingPlan,
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

export const userBillingDetails: gql.QueryResolvers["userBillingDetails"] = async (
    _parent,
    _args,
    context,
    _info
): Promise<gql.BillingDetails | null> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }
const userBillingDetails = await  context.datasources.billing.getDetailsByUser(context.user._id)
const getSubscription = await context.core.stripe.subscriptions.retrieve(userBillingDetails?.subscriptionId)
    const billingDetails= {
        id:userBillingDetails?._id,
        card_number:userBillingDetails?.card,
        priceId:getSubscription.plan.id,
        cardBrand:userBillingDetails?.cardBrand,
        nextBilling:(getSubscription.current_period_end*1000).toString(),
        card_expiration:userBillingDetails?.expiry,
        plan:userBillingDetails?.plan,
        card_cvv:userBillingDetails?.cvv,
        name: userBillingDetails?.name,
        email: userBillingDetails?.email,
        country_code:userBillingDetails?.country_code,
        phone: userBillingDetails?.phone,
        street: userBillingDetails?.street,
        apt_suit_number: userBillingDetails?.apt_suit_number,
        region:userBillingDetails?.region,
        state: userBillingDetails?.state,
        city: userBillingDetails?.city,
        zip_code: userBillingDetails?.zip_code,

      };
    return billingDetails;

}
export const userBillingHistory:gql.QueryResolvers["userBillingHistory"] = async (
    _parent,
    _args,
    context,
    _info
): Promise<gql.BillingHistory | null> => {

    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }
    const allUserHistory =await context.datasources.history.getAllBy(context.user._id)
const history = allUserHistory?.map(history=>({
invoice:history.downloadInvoice,
amount:history.amount,
date:history.date.toISOString(),
plan:history.title

})) 
if(!history){
    return null;
}
return {
    billingHistory: history,
}

}



export const updateBillingDetails: gql.MutationResolvers["updateBillingDetails"] = async (
    _parent,
     args,
    context,
    _info
): Promise<gql.UpdateBillingPayload | null> => {

    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }
    const getBillingDetails = await context.datasources.billing.getDetailsByUser(context.user._id)
    if(!getBillingDetails){
        return {
            clientMutationId:"",
            reason:"Billing details not found",
            url:"",
            success:false
        }
    }


    let quantity=0;
    if(context.user.accountType===AccountType.Agency){

      const clients=await context.datasources.user.getActiveClientsFrom(context.user.agencyId)
      quantity=clients.length
  }else{
      const connections = await context.datasources.connection.getAllConnectionsFor(context.user.businessId)
      quantity =connections.length
  }
    quantity=quantity-getBillingDetails.quantity
    const stripeCustomerChanges={
        email:args.input.email ?? undefined,
        source: args.input.source ?? undefined,
        name: args.input.name ?? undefined,
        address: {
            line1: args.input.street?? undefined,
            city: args.input.city?? undefined,
            postal_code: args.input.zip_code ?? undefined,
            state: args.input.state?? undefined,
            country: args.input.region?? undefined,
              },

    }
    const databaseChanges={
        name:args.input.name ?? undefined,
        plan:args.input.billingPlan ?? undefined,
        email:args.input?.email ?? undefined,
        phone:args.input?.phone ?? undefined,
        country_code:args.input?.country_code ?? undefined,
        cardBrand:args.input.cardBrand ?? undefined,
        quantity:quantity,
        apt_suit_number:args.input?.apt_suit_number ?? undefined,
        region:args.input?.region ?? undefined,
        street:args.input?.street ?? undefined,
        city:args.input?.city ?? undefined,
        zip:args.input?.zip_code ?? undefined,
        card:args.input?.card ?? undefined,
        expiry:args.input?.expiry ?? undefined,
    }
    //update customer
    if(stripeCustomerChanges){
     await context.core.stripe.customers.update(getBillingDetails.customerId,stripeCustomerChanges)
    }
     const getSubscription = await context.core.stripe.subscriptions.retrieve(getBillingDetails.subscriptionId)
    //update plan
    if(args.input.planId){
        if(!getSubscription){
            return {
                clientMutationId:args.input.clientMutationId,
                reason:"Subscription not found",
                success:false
            }
        }
    try {
      await context.core.stripe.subscriptionItems.update(getSubscription.items.data[0].id,{
            price:args.input.planId,
            proration_behavior: 'none'
          },
          
          )
        
    } catch (error) {
        return {
            clientMutationId:args.input.clientMutationId,
            reason:"Invalid plan",
            success:false
        }
    }}
   
    //update quantity
    if(quantity&& quantity>0){
    await context.core.stripe.subscriptionItems.createUsageRecord(
        getSubscription.items.data[0].id,
        {
          quantity:quantity,
          timestamp: Math.floor(Date.now() / 1000),
        }
      ); 
    }
    if(databaseChanges){
     await context.datasources.billing.update(getBillingDetails._id,databaseChanges)
    }
    
    return {
        clientMutationId:args.input.clientMutationId,
        reason:"User Billing Details Update Successfully",
        success:true
    }
}