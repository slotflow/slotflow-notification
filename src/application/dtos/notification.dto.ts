import { ProviderAddressForUser } from "./common.dto";
import { notificationTemplateConstants } from "../../shared/utils/constants/notificationConstants";
import { AppConnect, AppointmentStatus, NotificationType, PaymentAccountStatus, PlanName } from "../../domain/enums/enum";

/** 
 * Notification common dtos
*/

// Notification data common event input
export interface CommonNotificationEventInput {
    userId: string;
    notificationType: NotificationType;
}





/**
 * Notifications events dtos
 */

// Publishing events dtos ( Main backend )

export interface SendAccountTrustStatusNotificationEventInput extends CommonNotificationEventInput{
    templateKey: typeof notificationTemplateConstants.accountTrustStatus;
    isTrusted: boolean;
}

export interface SendAppointmentStatusChangeForUserNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.providerAppointmentStatusForUser;
    appointmentStatus: AppointmentStatus;
    address?: ProviderAddressForUser;
}

export interface SendAppointmentStatusChangeForProviderNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.providerAppointmentStatusForProvider;
    appointmentDate: string;
    appointmentTime: string;
    appointmentMode: string;
    appointmentStatus: AppointmentStatus;
}

export interface SendAppConnectNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.appConnect;
    appConnect: AppConnect;
}

export interface ProviderPlanSubscribedNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.planSubscribed;
    planName: PlanName;
    isTrialBoolean: boolean;
    currentPeriodEnd: string;
}

export interface SlotBookedNotificationNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.slotBooked;
    appointmentDate: string;
    appointmentTime: string;
    providerName: string;
}

export interface GotAnAppointmentNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.gotAnAppointment;
    appointmentDate: string;
    appointmentTime: string;
    customerName: string;
}

export interface SendUpdatePasswordNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.passwordUpdate;
}


// Publishing evnts dtos ( Payment service ) 


// provider create payment success event
export interface ProviderSubscriptionPaymentSuccessNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.providerSubscriptionPaymentSuccess;
    transactionId: string;
};

// provider create payment failed event
export interface ProviderSubscriptionPaymentFailedNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.providerSubscriptionPaymentFailed;
};


export interface CreateBookingPaymentSuccessNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.userBookingPaymentSuccess;
    transactionId: string;
}

export interface StripeAccountStatusUpdatedNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.stripeAccountStatusUpdated;
    accountStatus: PaymentAccountStatus;
}

export interface UserBookingRefundPaymentSuccessNotificationEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.userBookingRefundPaymentSuccess;
    refundAmount: number;
    transactionId: string;
}

export interface UserBookingPaymentFailedEventInput extends CommonNotificationEventInput {
    templateKey: typeof notificationTemplateConstants.userBookingPaymentFailed;
}

export type NotificationEventPayload =
    | SendAccountTrustStatusNotificationEventInput
    | SendAppointmentStatusChangeForUserNotificationEventInput
    | SendAppointmentStatusChangeForProviderNotificationEventInput
    | SendAppConnectNotificationEventInput
    | ProviderSubscriptionPaymentSuccessNotificationEventInput
    | ProviderSubscriptionPaymentFailedNotificationEventInput
    | ProviderPlanSubscribedNotificationEventInput
    | CreateBookingPaymentSuccessNotificationEventInput
    | SlotBookedNotificationNotificationEventInput
    | StripeAccountStatusUpdatedNotificationEventInput
    | SendUpdatePasswordNotificationEventInput
    | GotAnAppointmentNotificationEventInput
    | UserBookingRefundPaymentSuccessNotificationEventInput
    | UserBookingPaymentFailedEventInput;

export type NotificationTemplateKey = NotificationEventPayload["templateKey"];

type PayloadFor<K extends NotificationTemplateKey> = Extract<
    NotificationEventPayload,
    { templateKey: K }
>;

export interface NotificationTemplateDefinition<K extends NotificationTemplateKey> {
    title: (data: Omit<PayloadFor<K>, "templateKey" | "notificationType" | "userId">) => string;
    body: (data: Omit<PayloadFor<K>, "templateKey" | "notificationType" | "userId">) => string;
}

export type NotificationTemplateRegistry = {
    [K in NotificationTemplateKey]: NotificationTemplateDefinition<K>;
};





/**
 * Push notification service dtos
 */

// Push notification request
export interface SendPushNotificationRequest {
  tokens: string[],
  title: string;
  body: string;
  data?: Record<string, string>;
}