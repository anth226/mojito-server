import { GraphQLError } from "graphql"

export const UNAUTHORIZED_ERROR = new GraphQLError("Unauthorized", {
    extensions: {
        http: {
            status: 401,
        },
    },
})
