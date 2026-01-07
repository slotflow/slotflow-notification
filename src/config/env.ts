import dotenv from "dotenv";
dotenv.config();

import { Validator } from "../utils/validator";

const validator = new Validator();

export const appConfig = {
  port: validator.requireNumber("PORT"),
};

export const mongoConfig = {
  mongoURL:
    process.env.NODE_ENV === "development"
      ? validator.requireEnv("MONGO_URI_DEV")
      : validator.requireEnv("MONGO_URI"),
};

export const mailConfig = {
  officialMail: validator.requireEnv("OFFICIAL_EMAIL"),
  officialMailPassword: validator.requireEnv("OFFICIALEMAIL_PASS"),
  noreplyEmail: validator.requireEnv("OFFICIAL_NOREPLY_EMAIL"),
};

export const kafkaConfig = {
  clientId: validator.requireEnv("KAFKA_CLIENT_ID"),
  groupId: validator.requireEnv("KAFKA_GROUP_ID"),
  brokers: validator.requireEnv("KAFKA_BROKERS").split(","),

  topics: {
  sendOtp: validator.requireEnv("KAFKA_SENDOTP_TOPIC"),
  registerSuccess: validator.requireEnv("KAFKA_REGISTER_SUCCESS_TOPIC"),
  adminProviderReview: validator.requireEnv("KAFKA_ADMIN_PROVIDER_REVIEW_TOPIC"),
  accountBlockStatus: validator.requireEnv("KAFKA_ACCOUNT_BLOCK_STATUS_TOPIC"),
  accountTrustStatus: validator.requireEnv("KAFKA_ACCOUNT_TRUST_STATUS_TOPIC"),
  gotAppointment: validator.requireEnv("KAFKA_GOT_APPOINTMENT_TOPIC"),

  confirmAppointment: validator.requireEnv("KAFKA_CONFIRM_APPOINTMENT_TOPIC"),
  rejectAppointment: validator.requireEnv("KAFKA_REJECT_APPOINTMENT_TOPIC"),

  userPayment: validator.requireEnv("KAFKA_USER_PAYMENT_TOPIC"),
  providerPayout: validator.requireEnv("KAFKA_PROVIDER_PAYOUT_TOPIC"),

  stripeConnect: validator.requireEnv("KAFKA_STRIPE_CONNECT_TOPIC"),
  googleConnect: validator.requireEnv("KAFKA_GOOGLE_CONNECT_TOPIC"),

  confirmSubscription: validator.requireEnv(
    "KAFKA_PROVIDER_CONFIRM_SUBSCRIPTION_TOPIC"
  ),

  createGoogleCalendarEvent: validator.requireEnv(
    "KAFKA_CREATE_GOOGLE_CALENDAR_EVENT_TOPIC"
  ),
  updateGoogleCalendarEvent: validator.requireEnv(
    "KAFKA_UPDATE_GOOGLE_CALENDAR_EVENT_TOPIC"
  ),
  },
};

export const awsConfig = {
  aws_access_key_id: validator.requireEnv("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key: validator.requireEnv("AWS_SECRET_ACCESS_KEY"),
  aws_region: validator.requireEnv("AWS_REGION"),
};
