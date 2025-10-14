import { awsConfig } from "../../config/env";
import { SESClient } from "@aws-sdk/client-ses";

export const ses = new SESClient({
    region: awsConfig.aws_region!,
    credentials: {
        accessKeyId: awsConfig.aws_access_key_id!,
        secretAccessKey: awsConfig.aws_secret_access_key!,
    },
})