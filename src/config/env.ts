import dotenv from "dotenv";
dotenv.config();

import { Validator } from "../utils/validator";

const validator = new Validator();

export const appConfig = {
  nodeEnv: validator.requireEnv("NODE_ENV"),
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

  groups: {
    inappGroupId: validator.requireEnv("KAFKA_INAPP_NOTIFICATION_GROUP_ID"),
    pushGroupId: validator.requireEnv("KAFKA_PUSH_NOTIFICATION_GROUP_ID"),
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
      email :{
        // EMAIL
        sendOtp: validator.requireEnv("KAFKA_SEND_OTP"),
        registerSuccess: validator.requireEnv("KAFKA_REGISTER_SUCCESS"),
        adminProviderReview: validator.requireEnv("KAFKA_ADMIN_PROVIDER_REVIEW"),
        accountBlockStatus: validator.requireEnv("KAFKA_ACCOUNT_BLOCK_STATUS"),
        accountTrustStatus: validator.requireEnv("KAFKA_ACCOUNT_TRUST_STATUS"),
        providerAppointmentStatus: validator.requireEnv("KAFKA_PROVIDER_APPOINTMENT_STATUS"),
        appConnect: validator.requireEnv("KAFKA_APP_CONNECT"),
        providerTrialSubscription: validator.requireEnv("KAFKA_PROVIDER_TRIAL_SUBSCRIPTION"),
        providerSubscriptionPaymentSuccess: validator.requireEnv("KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS"),
        userBookingPaymentSuccess: validator.requireEnv("KAFKA_USER_BOOKING_PAYMENT_SUCCESS"),
        providerPayoutSuccess: validator.requireEnv("KAFKA_PROVIDER_PAYOUT_SUCCESS"),
        userCancelBookingSuccess: validator.requireEnv("KAFKA_USER_CANCEL_BOOKING_SUCCESS"),
      },

      push : {
        // PUSH NOTIFICATIONS
        accountBlockStatus: validator.requireEnv("KAFKA_ACCOUNT_BLOCK_STATUS"),
        accountTrustStatus: validator.requireEnv("KAFKA_ACCOUNT_TRUST_STATUS"),
        providerAppointmentStatus: validator.requireEnv("KAFKA_PROVIDER_APPOINTMENT_STATUS"),
        appConnect: validator.requireEnv("KAFKA_APP_CONNECT"),
        providerTrialSubscription: validator.requireEnv("KAFKA_PROVIDER_TRIAL_SUBSCRIPTION"),
        providerSubscriptionPaymentSuccess: validator.requireEnv("KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS"),
        userBookingPaymentSuccess: validator.requireEnv("KAFKA_USER_BOOKING_PAYMENT_SUCCESS"),
        providerPayoutSuccess: validator.requireEnv("KAFKA_PROVIDER_PAYOUT_SUCCESS"),
        userCancelBookingSuccess: validator.requireEnv("KAFKA_USER_CANCEL_BOOKING_SUCCESS"),
      },

      inApp: {
        // IN-APP NOTIFICATIONS
        providerAppointmentStatus: validator.requireEnv("KAFKA_PROVIDER_APPOINTMENT_STATUS"),
        appConnect: validator.requireEnv("KAFKA_APP_CONNECT"),
        providerTrialSubscription: validator.requireEnv("KAFKA_PROVIDER_TRIAL_SUBSCRIPTION"),
        providerSubscriptionPaymentSuccess: validator.requireEnv("KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS"),
        userBookingPaymentSuccess: validator.requireEnv("KAFKA_USER_BOOKING_PAYMENT_SUCCESS"),
        providerPayoutSuccess: validator.requireEnv("KAFKA_PROVIDER_PAYOUT_SUCCESS"),
        userCancelBookingSuccess: validator.requireEnv("KAFKA_USER_CANCEL_BOOKING_SUCCESS"),
      },

      calendar: {
        // GOOGLE CALENDAR
        providerAppointmentStatusCalendar: validator.requireEnv("KAFKA_PROVIDER_APPOINTMENT_STATUS"),
        userCancelBookingSuccessCalendar: validator.requireEnv("KAFKA_USER_CANCEL_BOOKING_SUCCESS"),
      },
    },

    // PS -> MBS
    pub: {
      googleCalendarEventsCreated: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_EVENTS_CREATED"),
    },

  },
};

export const awsConfig = {
  aws_access_key_id: validator.requireEnv("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key: validator.requireEnv("AWS_SECRET_ACCESS_KEY"),
  aws_region: validator.requireEnv("AWS_REGION"),
};
