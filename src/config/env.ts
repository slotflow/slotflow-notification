import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    port: 6000
}

export const mongoConfig = {
    mongoURL: process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI
}

export const mailConfig = {
    user: process.env.OFFICIAL_EMAIL,
    password: process.env.OFFICIALEMAIL_PASS,
    noreplyEmail: process.env.OFFICIAL_NOREPLY_EMAIL
}

export const kafkaConfig = {
  clientId: process.env.KAFKA_CLIENT_ID,
  groupId: process.env.KAFKA_GROUP_ID,
  brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
  otpSendTopic: process.env.KAFKA_SENDOTP_TOPIC || "sendOtp-events"
};

export const awsConfig = {
    aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_region: process.env.AWS_REGION,
}