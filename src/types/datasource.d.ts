import { IAdvertisement } from "./advertisement"
import { IAlert } from "./alerts"
import { ICampaign } from "./campaign"
import { IRevenue, IRevenueDataSource } from "./revenue"
import { ISpending } from "./spending"
import { UserDatasource } from "./user"
import { AgencyDatasource } from "./agency"
import { ConnectionDatasource } from "./connection"
import { AlertDatasource } from "./alert"
import { MetricDatasource } from "./metric"
import { BillingDataSource } from "./billingDetail"

export interface Datasources {
    user: UserDatasource
    agency: AgencyDatasource
    connection: ConnectionDatasource
    business: BusinessDatasource
    alert: AlertDatasource
    metric: MetricDatasource
    billing:BillingDataSource
    // alert: IAlertDataSource
    // connections: IConnectionDataSource
    // campaigns: ICampaignDataSource
    // advertisement: IAdvertisementDataSource
    // spending: ISpendingDataSource
    // impression: IImpressionDataSource
    // revenue: IRevenueDataSource
}
