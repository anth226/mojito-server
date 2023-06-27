import { BaseContext } from "@apollo/server"
import { Datasources } from "./datasource"
import { User } from "./user"

export interface RequestContext extends BaseContext {
    authPrivateKey: string
    datasources: Datasources
    user?: User
}
