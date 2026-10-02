import { formatString } from "../helpers/formatString";
import { NotificationTemplateRegistry } from "../../../application/dtos/notification.dto";
import { AppointmentStatus, PaymentAccountStatus, PlanName } from "../../../domain/enums/enum";

export const notificationTemplateConstants = {
  accountTrustStatus: "accountTrustStatus",
  providerAppointmentStatusForUser: "providerAppointmentStatusForUser",
  providerAppointmentStatusForProvider: "providerAppointmentStatusForProvider",
  appConnect: "appConnect",
  providerSubscriptionPaymentSuccess: "providerSubscriptionPaymentSuccess",
  providerSubscriptionPaymentFailed: "providerSubscriptionPaymentFailed",
  planSubscribed: "planSubscribed",
  slotBooked: "slotBooked",
  userBookingPaymentSuccess: "userBookingPaymentSuccess",
  userBookingPaymentFailed: "userBookingPaymentFailed",
  stripeAccountStatusUpdated: "stripeAccountStatusUpdated",
  passwordUpdate: "passwordUpdate",
  gotAnAppointment: "gotAnAppointment",
  userBookingRefundPaymentSuccess: "userBookingRefundPaymentSuccess",
} as const;


export const notificationTemplateRegistry: NotificationTemplateRegistry = {

  accountTrustStatus: {
    title: () => "Account Trust Status",
    body: (data) =>
      `Your account trust status has been updated to ${data.isTrusted ? "trusted" : "untrusted"
      }.`,
  },

  providerAppointmentStatusForUser: {
    title: () => "Booking Status Updated",
    body: (data) => {
      const statusText =
        data.appointmentStatus === AppointmentStatus.CONFIRMED
          ? "confirmed"
          : data.appointmentStatus === AppointmentStatus.REJECTED_BY_PROVIDER
            ? "rejected by provider"
            : data.appointmentStatus.toLowerCase();

      let locationText = "";
      if (data.address && data.address.city) {
        const addressLine = data.address.addressLine ? `${data.address.addressLine}, ` : "";
        locationText = ` Location: ${addressLine}${data.address.city}.`;
      }

      return `Your booking has been ${statusText}.${locationText}`;
    },
  },

  providerAppointmentStatusForProvider: {
    title: () => "Appointment Status Updated",
    body: (data) => {
      const statusText =
        data.appointmentStatus === AppointmentStatus.CONFIRMED
          ? "confirmed"
          : data.appointmentStatus === AppointmentStatus.REJECTED_BY_PROVIDER
            ? "rejected by provider"
            : data.appointmentStatus.replace(/_/g, " ").toLowerCase();

      return `Your appointment scheduled for ${data.appointmentDate} at ${data.appointmentTime} (${data.appointmentMode}) is now ${statusText}.`;
    },
  },

  appConnect: {
    title: () => "App Connected",
    body: (data) => {
      const appName = formatString(data.appConnect);
      return `Your account has been successfully connected with ${appName}.`;
    },
  },

  providerSubscriptionPaymentSuccess: {
    title: () => "Subscription Payment Successful",
    body: (data) =>
      `Your subscription payment has been processed successfully. Transaction ID: ${data.transactionId}.`,
  },

  providerSubscriptionPaymentFailed: {
    title: () => "Subscription Payment Failed",
    body: () =>
      "Your subscription payment attempt failed. Please update your payment details and try again.",
  },

  planSubscribed: {
    title: () => "Plan Subscribed",
    body: (data) => {
      const formattedDate = new Date(data.currentPeriodEnd).toLocaleDateString();
      const isTrial = data.isTrialBoolean || data.planName === PlanName.TRIAL;

      const formattedPlanName =
        data.planName.charAt(0).toUpperCase() + data.planName.slice(1).toLowerCase();

      if (isTrial) {
        return `Your free trial for the ${formattedPlanName} plan is active and will end on ${formattedDate}.`;
      }
      return `Your subscription for the ${formattedPlanName} plan is confirmed until ${formattedDate}.`;
    },
  },

  slotBooked: {
    title: () => "Slot Booking Confirmed",
    body: (data) =>
      `Your slot with ${data.providerName} is confirmed for ${data.appointmentDate} at ${data.appointmentTime}.`,
  },

  userBookingPaymentSuccess: {
    title: () => "Booking Payment Received",
    body: (data) =>
      `Your payment for booking was completed successfully. Transaction ID: ${data.transactionId}.`,
  },

  userBookingPaymentFailed: {
    title: () => "Payment Failed",
    body: () => {
      return `Your payment failed. We are holding your slot for the next 10 minutes. Try Another Payment Method to secure your booking.`;
    },
  },

  gotAnAppointment: {
    title: () => "New Appointment Request",
    body: (data) =>
      `You have a new appointment with ${data.customerName} on ${data.appointmentDate} at ${data.appointmentTime}.`,
  },

  stripeAccountStatusUpdated: {
    title: () => "Payout Account Updated",
    body: (data) => {
      const statusTextMap: Record<PaymentAccountStatus, string> = {
        [PaymentAccountStatus.PENDING]: "Pending Verification",
        [PaymentAccountStatus.ACTIVE]: "Active",
        [PaymentAccountStatus.RESTRICTED]: "Restricted",
        [PaymentAccountStatus.REVOKED]: "Revoked",
        [PaymentAccountStatus.NOT_CONNECTED]: "Not Connected",
      };

      const formattedStatus =
        statusTextMap[data.accountStatus] ||
        data.accountStatus.replace(/_/g, " ").toLowerCase();

      return `Your Stripe payment account status has been updated to ${formattedStatus}.`;
    },
  },

  passwordUpdate: {
    title: () => "Password Updated",
    body: () => "Your account password was updated successfully.",
  },

  userBookingRefundPaymentSuccess: {
    title: () => "Refund Processed",
    body: (data) => {
      const amount = Number(data.refundAmount) || 0;
      return `A refund of $${amount.toFixed(2)} has been successfully processed. Transaction ID: ${data.transactionId}.`;
    },
  },

};