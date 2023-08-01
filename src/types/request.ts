import { BaseContext } from "@apollo/server"
import { Datasources } from "./datasource"
import { User } from "./user"
import { Core } from "../core"

export interface RequestContext extends BaseContext {
    core: Core
    authPrivateKey: string
    defaultAwsBucket: string
    datasources: Datasources
    user?: User
}

declare global {
    namespace Express {
        export interface Request {
            core: Core
            datasources: Datasources
        }
    }
}
