import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import mime from "mime"

export class AWS {
    constructor(
        private accessKeyId: string,
        private secretAccessKey: string,
        private region: string
    ) {}

    async getSignedUrlForUpload(
        bucket: string,
        filename: string,
        expiresIn: number
    ): Promise<string> {
        const client = new S3Client({
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey,
            },
            region: this.region,
        })

        const contentType = mime.getType(filename)

        if (!contentType) {
            throw new Error("Unknown file content type")
        }

        const command = new PutObjectCommand({
            Key: filename,
            ContentType: contentType,
            Bucket: bucket,
        })

        return getSignedUrl(client, command, { expiresIn })
    }
}
