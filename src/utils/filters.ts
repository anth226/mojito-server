    export const getPlanById = (planId:string,planData:any) => {
        const filteredPlan = planData.find((plan:any) => plan.id === planId);
        return filteredPlan ? filteredPlan : null;
      };
   export  const getPriceById = (planId:string,planData:any) => {
        const filteredPlan = planData.find((plan:any) => plan.id === planId);
        if(filteredPlan){
        if(filteredPlan.tiers[0].unit_amount_decimal){
        return filteredPlan.tiers[0].unit_amount_decimal;
        }else if(filteredPlan.tiers[0].flat_amount_decimal){
        return filteredPlan.tiers[0].flat_amount_decimal;
        }else{
            return null
        }}
        else{
            return null
        }
    }
    export const filterPlanByUser=(userType:string,plansData:any) => {
        const filteredPlans =userType=="AGENCY"?
        plansData.filter((plan:any) => plan.planName.includes("Agency")):
        plansData.filter((plan:any) => !plan.planName.includes("Agency")) 

        return filteredPlans;
    }