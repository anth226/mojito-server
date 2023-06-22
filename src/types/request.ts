import { Datasources } from "./datasource"
import { User } from "./user"

export interface RequestContext {
    authPrivateKey: string
    datasources: Datasources
    user?: User
}
