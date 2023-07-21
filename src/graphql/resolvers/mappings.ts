import * as types from "../../types"
import * as gql from "../__generated__/resolvers-types"

function authUrl(
    context: types.RequestContext,
    conn: types.Connection
): string {
    return context.core.authFactory.create(conn.source).authUrl(conn._id)
}

export function toConnection(
    context: types.RequestContext,
    conn: types.Connection
): gql.Connection {
    return {
        ...conn,
        authUrl: authUrl(context, conn),
        sourceAccount: conn.availableAccounts.find(
            (acc) => acc.id == conn.sourceAccount
        ),
        createdAt: conn.createdAt.toISOString(),
        updatedAt: conn.updatedAt.toISOString(),
        syncedAt: conn.syncedAt?.toISOString(),
        syncFailedAt: conn.syncFailedAt?.toISOString(),
    }
}
