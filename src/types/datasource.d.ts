import { IAdvertisement } from "./advertisement";
import { IAlert } from "./alerts";
import { ICampaign } from "./campaign";
import { IRevenue, IRevenueDataSource } from "./revenue";
import { ISpending } from "./spending";
export interface IDataSources {
  user: IUserDataSource;
  agency: IAgencyDataSource;
  client: IClientDataSource;
  alert: IAlertDataSource;
  connections: IConnectionDataSource;
  campaigns: ICampaignDataSource;
  advertisement: IAdvertisementDataSource;
  spending: ISpendingDataSource;
  impression: IImpressionDataSource;
  revenue: IRevenueDataSource;
}
