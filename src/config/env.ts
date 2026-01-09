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
  broker1: validator.requireEnv("KAFKA_BROKER_1"),
  broker2: validator.requireEnv("KAFKA_BROKER_2"),
  broker3: validator.requireEnv("KAFKA_BROKER_3"),

  topics: {
    // topics to subscribe from notification service
    sub : {
      sendOtp: validator.requireEnv("KAFKA_SENDOTP_TOPIC"),
      registerSuccess: validator.requireEnv("KAFKA_REGISTER_SUCCESS_TOPIC"),
      adminProviderReview: validator.requireEnv("KAFKA_ADMIN_PROVIDER_REVIEW_TOPIC"),
      accountBlockStatus: validator.requireEnv("KAFKA_ACCOUNT_BLOCK_STATUS_TOPIC"),
      accountTrustStatus: validator.requireEnv("KAFKA_ACCOUNT_TRUST_STATUS_TOPIC"),
      gotAppointment: validator.requireEnv("KAFKA_GOT_APPOINTMENT_TOPIC"),
      appointmentStatus: validator.requireEnv("KAFKA_APPOINTMENT_STATUS_TOPIC"),
      userPayment: validator.requireEnv("KAFKA_USER_PAYMENT_STATUS_TOPIC"),
      providerPayment: validator.requireEnv("KAFKA_PROVIDER_PAYMENT_STATUS_TOPIC"),
      providerPayout: validator.requireEnv("KAFKA_PROVIDER_PAYOUT_TOPIC"),
      appConnect: validator.requireEnv("KAFKA_APP_CONNECT_TOPIC"),
      trialSubscription: validator.requireEnv("KAFKA_TRIAL_SUBSCRIPTION_TOPIC"),
      
      googleCalendarCreateRequest: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_CREATE_REQUEST_TOPIC"),
      googleCalendarUpdateRequest: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_UPDATE_REQUEST_TOPIC"),
    },
    
    // topics to publish from notification service
    pub: {
      googleCalendarCreateSuccess: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_CREATE_SUCCESS_TOPIC"),
      googleCalendarCreateFailed: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_CREATE_FAILED_TOPIC"),
      
      googleCalendarUpdateSuccess: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_UPDATE_SUCCESS_TOPIC"),
      googleCalendarUpdateFailed: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_UPDATE_FAILED_TOPIC"),
    },
  },
};

export const awsConfig = {
  aws_access_key_id: validator.requireEnv("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key: validator.requireEnv("AWS_SECRET_ACCESS_KEY"),
  aws_region: validator.requireEnv("AWS_REGION"),
};
