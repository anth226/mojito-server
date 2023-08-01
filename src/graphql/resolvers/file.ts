import * as gql from "../__generated__/resolvers-types"
import { UNAUTHORIZED_ERROR } from "./errors"
import dayjs from "dayjs"

const FILE_EXPIRATION_IN_SECONDS = 3600

export const createFile: gql.MutationResolvers["createFile"] = async (
    _parent,
    args,
    context,
    _info
): Promise<gql.CreateFilePayload | null> => {
    if (!context.user) {
        throw UNAUTHORIZED_ERROR
    }

    const url = await context.core.aws.getSignedUrlForUpload(
        context.defaultAwsBucket,
        args.input.key,
        FILE_EXPIRATION_IN_SECONDS
    )

    return {
        clientMutationId: args.input.clientMutationId,
        URL: url,
        expiresAt: dayjs()
            .add(FILE_EXPIRATION_IN_SECONDS, "second")
            .toISOString(),
    }
}
