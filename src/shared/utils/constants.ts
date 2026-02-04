import { AdminVerificationStatus, AppConnect, AppointmentStatus, OtpPurpose, PaymentStatus } from "../../domain/enums/enum";

// email main template
export const emailMainTemplate = {
  html: (subject: string, contentHTML: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
</head>
<body style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
    <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
        <div style="border-bottom: 1px solid #eee;">
            <a href="#" style="font-size: 1.4em; color: #635BFF; text-decoration: none; font-weight: 600;">Slotflow</a>
        </div>
        ${contentHTML}

        <p style="font-size: 0.9em;">Regards,<br />Slotflow</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
            <p>Slotflow Inc</p>
            <p>Sylicon Valley</p>
            <p>California</p>
            <p>USA</p>
        </div>
    </div>
</body>
</html>`,
};

// otp email template
export const otpEmailTemplate = {
  subject: (purpose: OtpPurpose): string =>
    purpose === OtpPurpose.REGISTRATION
      ? "Your OTP for Slotflow Registration"
      : "Your OTP to Reset Your Slotflow Password",

  head: (name: string): string =>
    `<p style="font-size: 1.1em;">Hi, ${name}</p>`,

  body: (purpose: OtpPurpose, otp: string): string => `
    ${purpose === OtpPurpose.REGISTRATION
      ? `<p>Please use the OTP below to complete your Slotflow registration.</p>`
      : `<p>Please use the OTP below to reset your Slotflow account password.</p>`
    }

    <p>This OTP is valid for <strong>5 minutes</strong>.</p>

    <div style="
      background: #635BFF;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 6px;
      width: max-content;
      margin: 12px 0;
      font-size: 1.4em;
      letter-spacing: 2px;
      font-weight: 600;
    ">
      ${otp}
    </div>

    <p style="margin-top: 16px;">
      If you did not initiate this request, please ignore this email.
    </p>
  `,
};

// welcome email template
export const welcomeEmailTemplate = {
  subject: (): string => "Welcome to Slotflow!",

  head: (name: string): string =>
    `<p style="font-size: 1.1em;">Hi ${name},</p>`,

  body: (role: string): string => `
    <p>
      Welcome to <strong>Slotflow</strong>! We’re delighted to have you onboard.
    </p>

    ${role === "Provider"
      ? `<p>
            You can now begin completing your onboarding process and start
            offering your services to users on Slotflow.
          </p>`
      : `<p>
            You can now explore providers, book appointments, and manage your
            bookings with ease.
          </p>`
    }

    <p>
      If you have any questions or need assistance, our support team is always
      here to help.
    </p>

    <p>
      We’re glad to have you with us,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};

// password reset success email template
export const passwordResetEmailTemplate = {
  subject: (): string => "Your Slotflow password has been successfully reset",

  head: (name: string): string =>
    `<p style="font-size: 1.1em;">Hi ${name},</p>`,

  body: (): string => `
    <p>
      This is a confirmation that the password for your <strong>Slotflow</strong> account 
      has been successfully changed.
    </p>

    <p>
      If you did not perform this action, please contact our support team immediately 
      to secure your account.
    </p>

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};

// admin provider review email template
export const adminProviderReviewEmailTemplate = {
  subject: (status: string) =>
    status === AdminVerificationStatus.APPROVED
      ? "Your Slotflow Account Has Been Approved"
      : "Update on Your Slotflow Account Review",

  head: (name: string) => `
    <p style="font-size:1.05em;">Dear ${name},</p>
  `,

  body: (status: string, reason?: string) => `
    ${status === AdminVerificationStatus.APPROVED
      ? `
          <p>
            We are pleased to inform you that your account has been
            successfully reviewed and approved by our administrative team.
          </p>

          <div style="background:#635BFF;color:#fff;
                      padding:10px 18px;border-radius:6px;
                      font-weight:600;display:inline-block;margin:12px 0;">
            Account Status: Approved
          </div>

          <p>
            You can now subscribe and access all available features on Slotflow.
          </p>
        `
      : `
          <p>
            Thank you for your interest in Slotflow.
            After careful review, your account approval was not successful
            at this time.
          </p>

          <div style="background:#EF4444;color:#fff;
                      padding:10px 18px;border-radius:6px;
                      font-weight:600;display:inline-block;margin:12px 0;">
            Account Status: Rejected
          </div>

          ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}

          <p>
            Please review the details, update your information if needed,
            and resubmit your request.
          </p>
        `
    }
  `,
};

// account block / unblock email template
export const accountBlockStatusEmailTemplate = {
  subject: (blocked: boolean): string =>
    blocked
      ? "Your Slotflow account has been blocked"
      : "Your Slotflow account has been unblocked",

  head: (name: string): string =>
    `<p style="font-size: 1.1em;">Hi ${name},</p>`,

  body: (blocked: boolean, reason?: string): string => `
    ${blocked
      ? `<p>
            We regret to inform you that your Slotflow account has been
            <strong>temporarily blocked</strong> by our administration team.
          </p>`
      : `<p>
            We’re happy to inform you that your Slotflow account has been
            <strong>successfully unblocked</strong>.
          </p>`
    }

    ${blocked && reason
      ? `<p><strong>Reason:</strong> ${reason}</p>`
      : ""
    }

    ${blocked
      ? `<p>
            During this period, you will not be able to access certain features
            of the platform.
          </p>
          <p>
            If you believe this action was taken in error or need clarification,
            please contact our support team.
          </p>`
      : `<p>
            You may now log in and continue using Slotflow without restrictions.
          </p>`
    }

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};

// account trust / untrust email template
export const accountTrustStatusEmailTemplate = {
  subject: (trusted: boolean): string =>
    trusted
      ? "Your Slotflow account has been marked as Trusted"
      : "Your Slotflow account trust status has been updated",

  head: (name: string): string =>
    `<p style="font-size: 1.1em;">Hi ${name},</p>`,

  body: (trusted: boolean, reason?: string): string => `
    ${trusted
      ? `<p>
            Congratulations! Your service provider account has been
            <strong>marked as Trusted</strong> on Slotflow.
          </p>
          <p>
            This status increases your credibility and helps clients
            choose your services with confidence.
          </p>`
      : `<p>
            We’d like to inform you that your service provider account is
            <strong>no longer marked as Trusted</strong> on Slotflow.
          </p>`
    }

    ${!trusted && reason
      ? `<p><strong>Reason:</strong> ${reason}</p>`
      : ""
    }

    ${trusted
      ? `<p>
            Keep delivering great service to maintain your trusted status.
          </p>`
      : `<p>
            Please review your account details and reach out to support if
            you believe this change was made in error.
          </p>`
    }

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};

// provider got appointment email template
export const gotAppointmentEmailTemplate = {
  subject: "You have a new appointment request",

  head: (providerName: string): string => `
    <p style="font-size: 1.1em;">
      Hi ${providerName},
    </p>
    <p>
      You have received a new appointment request from a client.
    </p>
  `,

  body: (
    appointmentDate: string,
    appointmentTime: string,
    appointmentDuration: string,
    appointmentMode: string
  ): string => `
    <div style="
      border: 1px solid #635BFF;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 0.95em;
    ">
      <p><strong>Date:</strong> ${appointmentDate}</p>
      <p><strong>Time:</strong> ${appointmentTime}</p>
      <p><strong>Duration:</strong> ${appointmentDuration}</p>
      <p><strong>Mode:</strong> ${appointmentMode}</p>
    </div>

    <p>
      You can review and manage this appointment from the
      <strong>Appointments</strong> section of your Slotflow dashboard.
    </p>

    <p>
      Please note that rejecting appointments frequently or without a valid
      reason may impact your <strong>provider rating</strong> and
      <strong>verification status</strong>.
    </p>

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};

// appointment status change email template
export const appointmentStatusEmailTemplate = {
  subject: (status: AppointmentStatus): string => {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return "Your appointment has been confirmed";
      case AppointmentStatus.REJECTED_BY_PROVIDER:
        return "Your appointment has been rejected";
      case AppointmentStatus.CANCELLED:
        return "Appointment has been cancelled";
      default:
        return "Appointment Update";
    }
  },

  head: (name: string, status: AppointmentStatus): string => {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return `<p style="font-size: 1.1em;">Hi ${name},</p>
                <p>Good news! Your appointment with the service provider has been confirmed.</p>`;
      case AppointmentStatus.REJECTED_BY_PROVIDER:
        return `<p style="font-size: 1.1em;">Hi ${name},</p>
                <p>We’re sorry! Your appointment request has been rejected by the service provider.</p>`;
      case AppointmentStatus.CANCELLED:
        return `<p style="font-size: 1.1em;">Hi ${name},</p>
                <p>Notice: The appointment has been cancelled by the user.</p>`;
      default:
        return `<p style="font-size: 1.1em;">Hi ${name},</p>`;
    }
  },

  body: (
    status: AppointmentStatus,
    appointmentDate: string,
    appointmentTime: string,
    appointmentMode: string
  ): string => `
    <div style="
      border: 1px solid #635BFF;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 0.95em;
    ">
      <p><strong>Date:</strong> ${appointmentDate}</p>
      <p><strong>Time:</strong> ${appointmentTime}</p>
      <p><strong>Mode:</strong> ${appointmentMode}</p>
    </div>

    <p>
      ${status === AppointmentStatus.CONFIRMED
      ? "You can view your appointment details in your Slotflow dashboard."
      : status === AppointmentStatus.REJECTED_BY_PROVIDER
        ? "Please try booking another slot or contact the service provider for more information."
        : "Please check your dashboard for more details."
    }
    </p>

    <p>
      Regards,<br/>
      <strong>The Slotflow Team</strong>
    </p>
  `,
};

// user payment / refund email template
export const userPaymentStatusEmailTemplate = {
  subject: (
    paymentStatus: PaymentStatus,
  ): string => {
    if (paymentStatus === PaymentStatus.PAID) {
      return "Payment successful for your appointment";
    }

    if (paymentStatus === PaymentStatus.REFUNDED) {
      return "Your appointment payment has been refunded";
    }

    return "Payment update from Slotflow";
  },

  head: (
    name: string,
    paymentStatus: PaymentStatus
  ): string => `
    <p style="font-size: 1.1em;">Hi ${name},</p>
    ${paymentStatus === PaymentStatus.PAID
      ? `<p>Your payment was successful, and your appointment has been confirmed.</p>`
      : `<p>Your appointment has been cancelled, and the payment has been refunded successfully.</p>`
    }
  `,

  body: (
    amount: number,
    transactionId: string,
    paymentDate: string,
    appointmentDate: string,
    paymentStatus: PaymentStatus
  ): string => `
    <div style="
      border: 1px solid #635BFF;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 0.95em;
    ">
      <p><strong>Amount ${paymentStatus === PaymentStatus.REFUNDED ? "Refunded" : "Paid"}:</strong> ₹${amount}</p>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p><strong>Payment Date:</strong> ${paymentDate}</p>
      <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
    </div>

    <p>
      ${paymentStatus === PaymentStatus.PAID
      ? "You can view your appointment details in your Slotflow dashboard."
      : "The refunded amount will be credited back to your original payment method shortly."
    }
    </p>

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};



// provider subscription payment / refund email template
export const providerSubscriptionPaymentEmailTemplate = {
  subject: (
    paymentStatus: PaymentStatus
  ): string => {
    if (paymentStatus === PaymentStatus.PAID) {
      return "Your Slotflow subscription is now active";
    }

    if (paymentStatus === PaymentStatus.REFUNDED) {
      return "Your Slotflow subscription has been cancelled";
    }

    return "Subscription update from Slotflow";
  },

  head: (
    name: string,
    paymentStatus: PaymentStatus
  ): string => `
    <p style="font-size: 1.1em;">Hi ${name},</p>
    ${paymentStatus === PaymentStatus.PAID
      ? `<p>Your subscription payment was successful and your Slotflow account is now active.</p>`
      : `<p>Your Slotflow subscription has been cancelled and the amount has been refunded.</p>`
    }
  `,

  body: (
    totalAmount: number,
    transactionId: string,
    paymentDate: string,
    paymentStatus: PaymentStatus
  ): string => `
    <div style="
      border: 1px solid #635BFF;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 0.95em;
    ">
      <p><strong>Amount ${paymentStatus === PaymentStatus.REFUNDED ? "Refunded" : "Paid"}:</strong> ₹${totalAmount}</p>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p><strong>Payment Date:</strong> ${paymentDate}</p>
    </div>

    <p>
      ${paymentStatus === PaymentStatus.PAID
      ? "You can continue managing your services and availability from your Slotflow dashboard."
      : "Access to subscription features will remain disabled after the current billing period."
    }
    </p>

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};



// provider payout email template
export const providerPayoutEmailTemplate = {
  subject: (): string =>
    "Your Slotflow payout has been processed",

  head: (name: string): string => `
    <p style="font-size: 1.1em;">Hi ${name},</p>
    <p>
      Your payout from Slotflow has been successfully processed and transferred
      to your registered bank account.
    </p>
  `,

  body: (
    amount: number,
    transactionId: string,
    payoutDate: string
  ): string => `
    <div style="
      border: 1px solid #635BFF;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 0.95em;
    ">
      <p><strong>Amount Credited:</strong> ₹${amount}</p>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p><strong>Payout Date:</strong> ${payoutDate}</p>
    </div>

    <p>
      Please allow some time for the amount to reflect in your bank account,
      depending on your bank’s processing time.
    </p>

    <p>
      If you have any questions, feel free to reach out to our support team.
    </p>

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};


export const appConnectEmailTemplate = {
  subject: (app: AppConnect): string =>
    `${app} account connected successfully to Slotflow`,

  head: (name: string, app: AppConnect): string => `
    <p style="font-size: 1.1em;">Hi ${name},</p>
    <p>
      Your <strong>${app}</strong> account has been successfully connected
      to your Slotflow account.
    </p>
  `,

  body: (app: AppConnect): string => `
    <div style="
      border: 1px solid #635BFF;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 0.95em;
    ">
      <p>
        You can now start using <strong>${app}</strong> integration features
        directly within Slotflow.
      </p>
    </div>

    <p>
      If you did not perform this action, please review your account settings
      or contact support immediately.
    </p>

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};

// provider trial subscription email template
export const providerTrialSubscriptionEmailTemplate = {
  subject: (): string =>
    "Your Slotflow Free Trial Has Started",

  head: (name: string): string => `
    <p style="font-size: 1.1em;">Hi ${name},</p>
    <p>
      Welcome to <strong>Slotflow</strong>! Your
      <strong>free trial subscription</strong> has been successfully activated.
    </p>
  `,

  body: (startDate: string, endDate: string): string => `
    <div style="
      border: 1px solid #22C55E;
      padding: 14px 18px;
      border-radius: 6px;
      margin: 16px 0;
      font-size: 0.95em;
      background-color: #F0FDF4;
    ">
      <p style="margin: 0 0 8px 0;">
        <strong>Trial Period Details:</strong>
      </p>
      <ul style="margin: 0; padding-left: 18px;">
        <li><strong>Start Date:</strong> ${startDate}</li>
        <li><strong>End Date:</strong> ${endDate}</li>
      </ul>
    </div>

    <p>
      During this trial, you’ll have access to Slotflow’s core features to
      manage appointments, automate workflows, and grow your business.
    </p>

    <p>
      If you have any questions or need assistance, our support team is always
      here to help.
    </p>

    <p>
      Regards,<br />
      <strong>The Slotflow Team</strong>
    </p>
  `,
};


// Google calendar event
export enum EventData {
  eventTitle = "Slotflow Appointment",
  eventAddBorderColor = "#635bff",
  eventAddTextColor = "#ffffff",
  eventCancelBorderColor = "#ff0000",
  eventCancelTextColor = "#ffffff",
  eventTimeZone = "Asia/Kolkata",
}

// Email service
export const emailServiceConstants = {
  gmail: "Gmail",
  slotflow: "Slotflow",
  source: "no-reply@slotflow.online"
};