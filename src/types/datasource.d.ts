import { IAdvertisement } from "./advertisement"
import { IAlert } from "./alerts"
import { ICampaign } from "./campaign"
import { IRevenue, IRevenueDataSource } from "./revenue"
import { ISpending } from "./spending"
import { UserDatasource } from "./user"

export interface IDataSources {
    user: UserDatasource
    // agency: IAgencyDataSource
    // client: IClientDataSource
    // alert: IAlertDataSource
    // connections: IConnectionDataSource
    // campaigns: ICampaignDataSource
    // advertisement: IAdvertisementDataSource
    // spending: ISpendingDataSource
    // impression: IImpressionDataSource
    // revenue: IRevenueDataSource
}
