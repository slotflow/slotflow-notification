import { Validator } from "../shared/validator/validator";

const validator = new Validator();

export const appConfig = {
  nodeEnv: validator.requireEnv("NODE_ENV"),
  port: validator.requireNumber("PORT"),
  isDev: validator.requireEnv("NODE_ENV") === "development",
  serviceName: validator.requireEnv("SERVICE_NAME")
};

export const mongodbConfig = {
  mongoUri: appConfig.isDev ? validator.requireEnv("MONGO_URI_DEV") : validator.requireEnv("MONGO_URI"),
};

export const officialConfig = {
  email: validator.requireEnv("OFFICIAL_EMAIL"),
  password: validator.requireEnv("OFFICIALEMAIL_PASS"),
};

export const firebaseConfig = {
  firebaseServiceAccountJson: validator.requireEnv("FIREBASE_SERVICE_ACCOUNT_JSON"),
};

export const otelConfig = {
    otelExporterOtlpTracesEndpoint: appConfig.isDev ? validator.requireEnv("OTEL_EXPORTER_OTLP_TRACES_ENDPOINT_DEV") : validator.requireEnv("OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"),
    otelExporterOtlpMetricsEndpoint: appConfig.isDev ? validator.requireEnv("OTEL_EXPORTER_OTLP_METRICS_ENDPOINT_DEV") : validator.requireEnv("OTEL_EXPORTER_OTLP_METRICS_ENDPOINT"),
    otelExporterOtlpLogsEndpoint: appConfig.isDev ? validator.requireEnv("OTEL_EXPORTER_OTLP_LOGS_ENDPOINT_DEV") : validator.requireEnv("OTEL_EXPORTER_OTLP_LOGS_ENDPOINT"),
};

export const kafkaConfig = {
  clientId: validator.requireEnv("KAFKA_CLIENT_ID"),

  groups: {
    notificationGroupId: validator.requireEnv("KAFKA_NOTIFICATION_GROUP_ID"),
    emailGroupId: validator.requireEnv("KAFKA_EMAIL_GROUP_ID"),
    calendarGroupId: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_GROUP_ID"),
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
        userBookingPaymentSuccess: validator.requireEnv("KAFKA_USER_BOOKING_PAYMENT_SUCCESS"),
        planSubscribed: validator.requireEnv("KAFKA_PLAN_SUBSCRIBED"),
        slotBooked: validator.requireEnv("KAFKA_SLOT_BOOKED"),
        gotAnAppointment: validator.requireEnv("KAFKA_GOT_AN_APPOINTMENT"),
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
        providerSubscriptionPaymentSuccess: validator.requireEnv("KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS"),
        userBookingPaymentSuccess: validator.requireEnv("KAFKA_USER_BOOKING_PAYMENT_SUCCESS"),
        planSubscribed: validator.requireEnv("KAFKA_PLAN_SUBSCRIBED"),
        slotBooked: validator.requireEnv("KAFKA_SLOT_BOOKED"),
        gotAnAppointment: validator.requireEnv("KAFKA_GOT_AN_APPOINTMENT"),
      },

      calendar: {
        // GOOGLE CALENDAR
        createGoogleCalendarEvent: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_EVENT_CREATE"),
        updateGoogleCalendarEvent: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_EVENT_UPDATE"),
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
