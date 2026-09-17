import { SendEmailCommon } from "./kafka.dtos";
import { emailTemplateConstants } from "../../shared/utils/constants/emailConstants";
import { AdminVerificationStatus, AppConnect, AppointmentStatus, OtpPurpose, PaymentFor, PaymentStatus, Role } from "../../domain/enums/enum";

// send otp event for registration and password update
export interface SendOtpEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.sendOtp;
    otp: string;
    purpose: OtpPurpose;
}

// send welcome event
export interface SendWelcomeEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.registerSuccess;
    role: Role;
}

// send reset password
export interface SendResetPasswordEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.passwordReset;
};

// send admin provider review event
export interface SendAdminProviderReviewEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.adminProviderReview;
    status: AdminVerificationStatus;
    reason?: string;
}

// send account block status event
export interface SendAccountBlockStatusEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.accountBlockStatus;
    blocked: boolean;
    reason?: string;
}

// send account trust status event
export interface SendAccountTrustStatusEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.accountTrustStatus;
    trusted: boolean;
    reason?: string;
}

// send appointment status change for user event
export interface SendAppointmentStatusChangeForUserEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.providerAppointmentStatusForUser;
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: AppointmentStatus;
    reason?: string;
}

// send app connect event
export interface SendAppConnectEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.appConnect;
    appConnect: AppConnect;
}

// send provider payment event
export interface SendProviderSubscriptionPaymentSuccessEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.providerSubscriptionPaymentSuccess;
    totalAmount: number;
    transactionId: string;
    paymentDate: string;
    receiptUrl: string;
};

// send booking payment success event
export interface SendBookingPaymentSuccessEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.userBookingPaymentSuccess;
    totalAmount: number,
    paymentDate: string,
    receiptUrl: string,
    transactionId: string,
}

// send subscription completed event
export interface SendPlanSubscribedEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.planSubscribed;
    subscribedPlan: string;
    startDate: string;
    endDate: string;
    isTrial: string;
}

// send slot booked event
export interface SendSlotBookedEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.slotBooked;
    appointmentDate: string;
    appointmentMode: string;
    appointmentStatus: string;
    providerName: string;
}

// send got an appointment event
export interface SendGotAnAppointmentEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.gotAnAppointment;
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: string;
    customerName: string;
}

// send user cancel booking refund payment success
export interface SendUserBookingRefundPaymentSuccessEventInput extends SendEmailCommon {
    templateKey: typeof emailTemplateConstants.userBookingRefundPaymentSuccess;
    refundDate: Date;
    refundAmount: number;
    transactionId: string;
}


// send provider payout event
// export interface SendProviderPayoutEventInput extends SendEmailCommon {
//     templateKey: typeof emailTemplateConstants.;
//     amount: number;
//     transactionId: string;
//     payoutDate: string;
// }

export type EmailEventPayload =
    | SendOtpEventInput
    | SendWelcomeEventInput
    | SendResetPasswordEventInput
    | SendAdminProviderReviewEventInput
    | SendAccountBlockStatusEventInput
    | SendAccountTrustStatusEventInput
    | SendAppointmentStatusChangeForUserEventInput
    | SendAppConnectEventInput
    | SendPlanSubscribedEventInput
    | SendSlotBookedEventInput
    | SendBookingPaymentSuccessEventInput
    | SendGotAnAppointmentEventInput
    | SendProviderSubscriptionPaymentSuccessEventInput
    | SendUserBookingRefundPaymentSuccessEventInput;

export type EmailTemplateKey = EmailEventPayload["templateKey"];

type PayloadFor<K extends EmailTemplateKey> = Extract<
    EmailEventPayload,
    { templateKey: K }
>;

export interface EmailTemplateDefinition<K extends EmailTemplateKey> {
    subject: (data: Omit<PayloadFor<K>, "templateKey" | "email">) => string;
    renderBody: (data: Omit<PayloadFor<K>, "templateKey" | "email">) => string;
}

export type EmailTemplateRegistry = {
    [K in EmailTemplateKey]: EmailTemplateDefinition<K>;
};