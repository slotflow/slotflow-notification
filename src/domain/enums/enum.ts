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
};