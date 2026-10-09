import { Validator } from "../shared/validator/validator";

const validator = new Validator();

export const appConfig = {
  nodeEnv: validator.requireEnv("NODE_ENV"),
  port: validator.requireNumber("PORT"),
  isDev: validator.requireEnv("NODE_ENV") === "development",
  serviceName: validator.requireEnv("SERVICE_NAME"),
};

export const callbackConfig = {
  integrationsUrl: appConfig.isDev
    ? validator.requireEnv("CLIENT_INTEGRATIONS_CALLBACK_URL_DEV")
    : validator.requireEnv("CLIENT_INTEGRATIONS_CALLBACK_URL"),
};

export const mongodbConfig = {
  mongoUri: appConfig.isDev
    ? validator.requireEnv("MONGO_URI_DEV")
    : validator.requireEnv("MONGO_URI"),
};

export const officialConfig = {
  email: validator.requireEnv("OFFICIAL_EMAIL"),
  password: validator.requireEnv("OFFICIAL_EMAIL_PASS"),
};

export const googleClientConfig = {
  googleClientId: validator.requireEnv("GOOGLE_CLIENT_ID"),
  googleClientSecret: validator.requireEnv("GOOGLE_CLIENT_SECRET"),
  googleCallbackUrl: appConfig.isDev
    ? validator.requireEnv("GOOGLE_CALLBACK_URL_DEV")
    : validator.requireEnv("GOOGLE_CALLBACK_URL"),
};

export const serviceConfig = {
  frontendUrl: appConfig.isDev
    ? validator.requireEnv("FRONTEND_URL_DEV")
    : validator.requireEnv("FRONTEND_URL"),
  apiGatewayUrl: appConfig.isDev
    ? validator.requireEnv("API_GATEWAY_URL_DEV")
    : validator.requireEnv("API_GATEWAY_URL"),
  mainBackendServiceUrl: appConfig.isDev
    ? validator.requireEnv("MAIN_BACKEND_SERVICE_URL_DEV")
    : validator.requireEnv("MAIN_BACKEND_SERVICE_URL"),
  realtimeServiceUrl: appConfig.isDev
    ? validator.requireEnv("REALTIME_SERVICE_URL_DEV")
    : validator.requireEnv("REALTIME_SERVICE_URL"),
  notificationServiceUrl: appConfig.isDev
    ? validator.requireEnv("NOTIFICATION_SERVICE_URL_DEV")
    : validator.requireEnv("NOTIFICATION_SERVICE_URL"),
  paymentServiceUrl: appConfig.isDev
    ? validator.requireEnv("PAYMENT_SERVICE_URL_DEV")
    : validator.requireEnv("PAYMENT_SERVICE_URL"),
};

export const firebaseConfig = {
  firebaseServiceAccountJson: validator.requireEnv("FIREBASE_SERVICE_ACCOUNT_JSON"),
};

export const otelConfig = {
  otelExporterOtlpTracesEndpoint: appConfig.isDev
    ? validator.requireEnv("OTEL_EXPORTER_OTLP_TRACES_ENDPOINT_DEV")
    : validator.requireEnv("OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"),
  otelExporterOtlpMetricsEndpoint: appConfig.isDev
    ? validator.requireEnv("OTEL_EXPORTER_OTLP_METRICS_ENDPOINT_DEV")
    : validator.requireEnv("OTEL_EXPORTER_OTLP_METRICS_ENDPOINT"),
  otelExporterOtlpLogsEndpoint: appConfig.isDev
    ? validator.requireEnv("OTEL_EXPORTER_OTLP_LOGS_ENDPOINT_DEV")
    : validator.requireEnv("OTEL_EXPORTER_OTLP_LOGS_ENDPOINT"),
};

export const aesConfig = {
  aesSalt: validator.requireEnv("AES_ENCRYPTION_SALT"),
  algorithm: validator.requireEnv("AES_ALGORITHM"),
  ivLength: validator.requireNumber("AES_IV_LENGTH"),
  inputEncoding: validator.requireEnv("AES_INPUT_ENCODING"),
  outputEncoding: validator.requireEnv("AES_OUTPUT_ENCODING"),
  separator: ":",
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
    // validator.requireEnv("KAFKA_BROKER_2"),
    // validator.requireEnv("KAFKA_BROKER_3"),
  ],

  topics: {
    dlqTopic: validator.requireEnv("KAFKA_DLQ_TOPIC"),
    sub: {
      email: {
        // EMAIL
        sendOtp: validator.requireEnv("KAFKA_SEND_OTP"),
        registerSuccess: validator.requireEnv("KAFKA_REGISTER_SUCCESS"),
        passwordReset: validator.requireEnv("KAFKA_PASSWORD_RESET"),
        adminProviderReview: validator.requireEnv("KAFKA_ADMIN_PROVIDER_REVIEW"),
        accountBlockStatus: validator.requireEnv("KAFKA_ACCOUNT_BLOCK_STATUS"),
        accountTrustStatus: validator.requireEnv("KAFKA_ACCOUNT_TRUST_STATUS"),
        providerAppointmentStatusForUser: validator.requireEnv(
          "KAFKA_PROVIDER_APPOINTMENT_STATUS_FOR_USER",
        ),
        appConnect: validator.requireEnv("KAFKA_APP_CONNECT"),
        providerSubscriptionPaymentSuccess: validator.requireEnv(
          "KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS",
        ),
        planSubscribed: validator.requireEnv("KAFKA_PLAN_SUBSCRIBED"),
        slotBooked: validator.requireEnv("KAFKA_SLOT_BOOKED"),
        userBookingPaymentSuccess: validator.requireEnv("KAFKA_USER_BOOKING_PAYMENT_SUCCESS"),
        gotAnAppointment: validator.requireEnv("KAFKA_GOT_AN_APPOINTMENT"),
        userBookingRefundPaymentSuccess: validator.requireEnv(
          "KAFKA_USER_BOOKING_REFUND_PAYMENT_SUCCESS",
        ),
      },

      notification: {
        // NOTIFICATIONS
        accountTrustStatus: validator.requireEnv("KAFKA_ACCOUNT_TRUST_STATUS"),
        providerAppointmentStatusForUser: validator.requireEnv(
          "KAFKA_PROVIDER_APPOINTMENT_STATUS_FOR_USER",
        ),
        providerAppointmentStatusForProvider: validator.requireEnv(
          "KAFKA_PROVIDER_APPOINTMENT_STATUS_FOR_PROVIDER",
        ),
        appConnect: validator.requireEnv("KAFKA_APP_CONNECT"),
        providerSubscriptionPaymentSuccess: validator.requireEnv(
          "KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_SUCCESS",
        ),
        providerSubscriptionPaymentFailed: validator.requireEnv(
          "KAFKA_PROVIDER_SUBSCRIPTION_PAYMENT_FAILED",
        ),
        planSubscribed: validator.requireEnv("KAFKA_PLAN_SUBSCRIBED"),
        slotBooked: validator.requireEnv("KAFKA_SLOT_BOOKED"),
        userBookingPaymentSuccess: validator.requireEnv("KAFKA_USER_BOOKING_PAYMENT_SUCCESS"),
        userBookingPaymentFailed: validator.requireEnv("KAFKA_USER_BOOKING_PAYMENT_FAILED"),
        gotAnAppointment: validator.requireEnv("KAFKA_GOT_AN_APPOINTMENT"),
        stripeAccountStatusUpdated: validator.requireEnv("KAFKA_STRIPE_ACCOUNT_STATUS_UPDATED"),
        passwordUpdate: validator.requireEnv("KAFKA_PASSWORD_UPDATE"),
        userBookingRefundPaymentSuccess: validator.requireEnv(
          "KAFKA_USER_BOOKING_REFUND_PAYMENT_SUCCESS",
        ),
      },

      calendar: {
        // GOOGLE CALENDAR
        createGoogleCalendarEvent: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_EVENT_CREATE"),

        // TODO implement: update the calendar when resheduling is happens
        updateGoogleCalendarEvent: validator.requireEnv("KAFKA_GOOGLE_CALENDAR_EVENT_UPDATE"),
      },
    },

    pub: {
      appConnect: validator.requireEnv("KAFKA_APP_CONNECT"),
      googleCalendarCreateEventSuccess: validator.requireEnv(
        "KAFKA_GOOGLE_CALENDAR_CREATE_EVENT_SUCCESS",
      ),
      googleCalendarCreateEventFailed: validator.requireEnv(
        "KAFKA_GOOGLE_CALENDAR_CREATE_EVENT_FAILED",
      ),
    },
  },
};

export const awsConfig = {
  aws_access_key_id: validator.requireEnv("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key: validator.requireEnv("AWS_SECRET_ACCESS_KEY"),
  aws_region: validator.requireEnv("AWS_REGION"),
};
