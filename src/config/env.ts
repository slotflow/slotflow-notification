import dotenv from "dotenv";
dotenv.config();

import { Validator } from "../shared/validator/validator";

const validator = new Validator();

export const appConfig = {
  nodeEnv: validator.requireEnv("NODE_ENV"),
  port: validator.requireNumber("PORT"),
};

export const mongodbConfig = {
  mongoUri: process.env.NODE_ENV === "development" ? validator.requireEnv("MONGO_URI_DEV") : validator.requireEnv("MONGO_URI"),
};

export const officialConfig = {
  email: validator.requireEnv("OFFICIAL_EMAIL"),
  password: validator.requireEnv("OFFICIALEMAIL_PASS"),
};

export const firebaseConfig = {
  firebaseServiceAccountJson: validator.requireEnv("FIREBASE_SERVICE_ACCOUNT_JSON"),
};

export const kafkaConfig = {
  clientId: validator.requireEnv("KAFKA_CLIENT_ID"),

  groups: {
    notificationGroupId: validator.requireEnv("KAFKA_NOTIFICATION_GROUP_ID"),
    emailGroupId: validator.requireEnv("KAFKA_EMAIL_NOTIFICATION_GROUP_ID"),
    calendarGroupId: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_NOTIFICATION_GROUP_ID"),
  },

  brokers: [
    validator.requireEnv("KAFKA_BROKER_1"),
    validator.requireEnv("KAFKA_BROKER_2"),
    validator.requireEnv("KAFKA_BROKER_3"),
  ],

  topics: {

    sub: {
      email: {
        // EMAIL
        sendOtp: validator.requireEnv("KAFKA_SEND_OTP"),
        registerSuccess: validator.requireEnv("KAFKA_REGISTER_SUCCESS"),
        passwordReset: validator.requireEnv("KAFKA_PASSWORD_RESET"),
        adminProviderReview: validator.requireEnv("KAFKA_ADMIN_PROVIDER_REVIEW"),
        accountBlockStatus: validator.requireEnv("KAFKA_ACCOUNT_BLOCK_STATUS"),
        accountTrustStatus: validator.requireEnv("KAFKA_ACCOUNT_TRUST_STATUS"),
        providerAppointmentStatusForUser: validator.requireEnv("KAFKA_PROVIDER_APPOINTMENT_STATUS_FOR_USER"),
        appConnect: validator.requireEnv("KAFKA_APP_CONNECT"),
        providerTrialSubscription: validator.requireEnv("KAFKA_PROVIDER_TRIAL_SUBSCRIPTION"),
        providerSubscriptionPaymentSuccess: validator.requireEnv("KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS"),
      },

      notification: {
        // NOTIFICATIONS
        passwordReset: validator.requireEnv("KAFKA_PASSWORD_RESET"),
        accountBlockStatus: validator.requireEnv("KAFKA_ACCOUNT_BLOCK_STATUS"),
        accountTrustStatus: validator.requireEnv("KAFKA_ACCOUNT_TRUST_STATUS"),
        providerAppointmentStatusForUser: validator.requireEnv("KAFKA_PROVIDER_APPOINTMENT_STATUS_FOR_USER"),
        providerAppointmentStatusForProvider: validator.requireEnv("KAFKA_PROVIDER_APPOINTMENT_STATUS_FOR_PROVIDER"),
        appConnect: validator.requireEnv("KAFKA_APP_CONNECT"),
        providerTrialSubscription: validator.requireEnv("KAFKA_PROVIDER_TRIAL_SUBSCRIPTION"),
      },

      calendar: {
        // GOOGLE CALENDAR
        createGoogleCalendar: validator.requireEnv("KAFKA_CREATE_GOOGLE_CALENDAR"),
        updateGoogleCalendar: validator.requireEnv("KAFKA_UPDATE_GOOGLE_CALENDAR"),
      },
    },

    pub: {
      googleCalendarSuccess: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_SUCCESS"),
      googleCalendarFailed: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_FAILED"),
    },

  },
};

export const awsConfig = {
  aws_access_key_id: validator.requireEnv("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key: validator.requireEnv("AWS_SECRET_ACCESS_KEY"),
  aws_region: validator.requireEnv("AWS_REGION"),
};
