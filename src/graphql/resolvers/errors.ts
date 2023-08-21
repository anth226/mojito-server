import { GraphQLError } from "graphql"

export const UNAUTHORIZED_ERROR = new GraphQLError("Unauthorized", {
    extensions: {
        http: {
            status: 401,
        },
    },
})
export const PAYMENT_ERROR = new GraphQLError("An error occurred while processing the payment.",{
    extensions: {
        http: {
            status: 500,
        },
    },
})

export const UNEXPECTED_ERROR = new GraphQLError("An unexpected error occurred.",{
    extensions: {
        http: {
            status: 500,
        },
    },
})
