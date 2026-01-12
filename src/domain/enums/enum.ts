export enum Role {
    Admin = "ADMIN",
    User = "USER",
    Provider = "PROVIDER",
}

export enum OtpPurpose {
  REGISTRATION = "REGISTRATION",
  PASSWORD_RESET = "PASSWORD_RESET",
}

export enum AppointmentStatus {
  Booked = "Booked",
  Completed = "Completed",
  Cancelled = "Cancelled",
  RejectedByProvider = "RejectedByProvider",
  NotAttended = "NotAttended",
  Confirmed = "Confirmed",
}


export enum AdminVerificationStatus {
    REQUESTED = "Requested",
    UNDER_REVIEW = "Under_review",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    RESUBMITTED = "Resubmitted",
    NOT_REQUESTED = "Not_submitted",
}

export enum PaymentStatus {
    Pending = "Pending",
    Paid = "Paid",
    Failed = "Failed",
    Cancelled = "Cancelled",
    Refunded = "Refunded",
}

export enum PaymentFor {
    ProviderSubscription = "ProviderSubscription",
    AppointmentBooking = "AppointmentBooking",
    ProviderPayout = "ProviderPayout",
    CancelBooking = "CancelBooking",
    CancelSubscription = "CancelSubscription",
}

export enum AppConnect {
    Google = "Google",
    Stripe = "Stripe",
    Notion = "Notion",
    WhatsApp = "WhatsApp",
    Razorpay = "Razorpay",
    Paypal = "Paypal",
}

export enum PaymentGateway {
    Stripe = "Stripe",
    Razorpay = "Razorpay",
    Paypal = "Paypal"
}