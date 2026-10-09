import { formatString } from "../helpers/formatString";
import { AdminVerificationStatus, AppointmentStatus, OtpPurpose } from "../../../domain/enums/enum";
import {
  EmailTemplateRegistry,
  SendAccountBlockStatusEventInput,
  SendAccountTrustStatusEventInput,
  SendAdminProviderReviewEventInput,
  SendAppConnectEventInput,
  SendAppointmentStatusChangeForUserEventInput,
  SendBookingPaymentSuccessEventInput,
  SendGotAnAppointmentEventInput,
  SendOtpEventInput,
  SendPlanSubscribedEventInput,
  SendProviderSubscriptionPaymentSuccessEventInput,
  SendResetPasswordEventInput,
  SendSlotBookedEventInput,
  SendUserBookingRefundPaymentSuccessEventInput,
} from "../../../application/dtos/email.dto";

export const emailTemplateRegistry: EmailTemplateRegistry = {
  // otp email content
  sendOtp: {
    subject: (data: Omit<SendOtpEventInput, "templateKey" | "email">) =>
      data.purpose === OtpPurpose.REGISTRATION
        ? "Verify your email address for Slotflow"
        : "Reset your Slotflow password",

    renderBody: (data: Omit<SendOtpEventInput, "templateKey" | "email">) => `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        ${
          data.purpose === OtpPurpose.REGISTRATION
            ? "Thank you for signing up with <strong>Slotflow</strong>. To complete your registration, please enter the one-time verification code below:"
            : "We received a request to reset your password for your <strong>Slotflow</strong> account. Use the one-time code below to proceed:"
        }
      </p>

      <!-- OTP Code Box -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 24px 0; width: 100%;">
        <tr>
          <td align="center">
            <div style="background-color: #F4F3FF; border: 1px solid #E0DFFF; border-radius: 8px; padding: 16px 32px; display: inline-block; text-align: center;">
              <span style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #635BFF; display: block;">
                ${data.otp}
              </span>
            </div>
          </td>
        </tr>
      </table>

      <!-- Expiry & Security Warning -->
      <p style="margin: 0 0 12px 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
        This code is valid for <strong>10 minutes</strong>. For security reasons, please do not share this code with anyone.
      </p>

      <p style="margin: 0; color: #868E96; font-size: 13px; line-height: 1.5;">
        If you did not request this code, you can safely ignore this email.
      </p>
    `,
  },

  // registration completed welcome email content
  registerSuccess: {
    subject: () => "Welcome to Slotflow",

    renderBody: () => `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        Welcome to <strong>Slotflow</strong>! We're excited to have you on board.
      </p>

      <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
  You have successfully registered and completed your onboarding on Slotflow.
</p>

<!-- Confirmation Callout Box -->
<div style="background-color: #F8F9FA; border-left: 4px solid #635BFF; padding: 16px 20px; border-radius: 4px; margin: 24px 0;">
  <p style="margin: 0; font-weight: 600; color: #212529; font-size: 14px;">
    Your account is now fully set up and ready to use.
  </p>
</div>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
        <tr>
          <td align="center" style="border-radius: 8px; background-color: #635BFF;">
            <a href="https://slotflow.com/dashboard" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
              Go to Dashboard &rarr;
            </a>
          </td>
        </tr>
      </table>

      <p style="margin: 0; color: #868E96; font-size: 13px; line-height: 1.5;">
        If you have any questions, feel free to reply directly to this email or reach out to our support team.
      </p>
    `,
  },

  // password reset success email
  passwordReset: {
    subject: () => "Your Slotflow password has been updated",

    // Body content rendered inside emailMainTemplate
    renderBody: (_data: Omit<SendResetPasswordEventInput, "templateKey" | "email">) => `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        This is a confirmation that the password for your <strong>Slotflow</strong> account was successfully updated.
      </p>

      <!-- Status Callout Card -->
      <div style="background-color: #F8F9FA; border-left: 4px solid #10B981; padding: 16px 20px; border-radius: 4px; margin: 24px 0;">
        <p style="margin: 0; color: #15803D; font-weight: 600; font-size: 14px;">
          ✓ Password changed successfully
        </p>
      </div>

      <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
        You can now log back into your account using your new password.
      </p>

      <!-- Primary Action Button -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
        <tr>
          <td align="center" style="border-radius: 8px; background-color: #635BFF;">
            <a href="https://slotflow.com/auth/login" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
              Log In to Slotflow &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- Security Warning Notice -->
      <div style="background-color: #FFF5F5; border: 1px solid #FEB2B2; border-radius: 8px; padding: 16px 20px; margin-top: 24px;">
        <p style="margin: 0 0 6px 0; color: #C53030; font-weight: 600; font-size: 14px;">
          Didn't make this change?
        </p>
        <p style="margin: 0; color: #9B2C2C; font-size: 13px; line-height: 1.5;">
          If you did not reset your password, please contact our support team immediately or request another password reset to secure your account.
        </p>
      </div>
    `,
  },

  // admin approve or reject provider email
  adminProviderReview: {
    subject: (data: Omit<SendAdminProviderReviewEventInput, "templateKey" | "email">) =>
      data.status === AdminVerificationStatus.APPROVED
        ? "Your Slotflow Provider Account Has Been Approved"
        : "Update Regarding Your Slotflow Provider Application",

    renderBody: (data: Omit<SendAdminProviderReviewEventInput, "templateKey" | "email">) => `
      ${
        data.status === AdminVerificationStatus.APPROVED
          ? `
          <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
            We are pleased to inform you that your provider application has been reviewed and <strong>approved</strong> by our administrative team.
          </p>

          <!-- Approved Status Badge -->
          <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
            <p style="margin: 0; color: #065F46; font-size: 14px; font-weight: 600;">
              ✓ Account Status: Approved
            </p>
          </div>

          <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
            You can now subscribe and access all available provider features on Slotflow.
          </p>

          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
            <tr>
              <td align="center" style="border-radius: 8px; background-color: #635BFF;">
                <a href="https://slotflow.com/dashboard" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
                  Go to Dashboard &rarr;
                </a>
              </td>
            </tr>
          </table>
          `
          : `
          <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
            Thank you for your interest in Slotflow. After careful review, your account approval was not successful at this time.
          </p>

          <!-- Rejection Status Badge -->
          <div style="background-color: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
            <p style="margin: 0; color: #991B1B; font-size: 14px; font-weight: 600;">
              ✕ Account Status: Rejected
            </p>
          </div>

          ${
            data.reason
              ? `
              <div style="margin: 20px 0;">
                <p style="margin: 0 0 6px 0; color: #212529; font-weight: 600; font-size: 14px;">Reason for Rejection:</p>
                <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">${data.reason}</p>
              </div>
              `
              : ""
          }

          <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
            Please visit Slotflow and check out your submitted details. You can edit your information on the platform and resubmit your application for review.
          </p>

          <!-- Support Note -->
          <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
            <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
              If you are facing any issues or need assistance, please feel free to reach out to our support team at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
            </p>
          </div>
          `
      }
    `,
  },

  // admin block or unblock
  accountBlockStatus: {
    subject: (data: Omit<SendAccountBlockStatusEventInput, "templateKey" | "email">) =>
      data.blocked
        ? "Notice Regarding Your Slotflow Account Status"
        : "Your Slotflow Account Has Been Reactivated",

    renderBody: (data: Omit<SendAccountBlockStatusEventInput, "templateKey" | "email">) => `
      ${
        data.blocked
          ? `
          <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
            We are writing to inform you that your <strong>Slotflow</strong> account has been suspended due to activities that violate our Terms of Service or safety guidelines.
          </p>

          <!-- Blocked Badge -->
          <div style="background-color: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
            <p style="margin: 0; color: #991B1B; font-size: 14px; font-weight: 600;">
              ✕ Account Status: Blocked / Suspended
            </p>
          </div>

          ${
            data.reason
              ? `
              <div style="margin: 20px 0;">
                <p style="margin: 0 0 6px 0; color: #212529; font-weight: 600; font-size: 14px;">Reason for Suspension:</p>
                <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">${data.reason}</p>
              </div>
              `
              : ""
          }

          <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
            While your account is blocked, access to bookings, services, and platform features will be restricted.
          </p>

          <!-- Support Contact Box -->
          <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
            <p style="margin: 0 0 6px 0; color: #212529; font-weight: 600; font-size: 13px;">Need to appeal or ask a question?</p>
            <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
              If you believe this action was taken in error or would like to discuss this further, please contact our team at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
            </p>
          </div>
          `
          : `
          <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
            We are pleased to let you know that your <strong>Slotflow</strong> account has been successfully unblocked and reactivated.
          </p>

          <!-- Unblocked Badge -->
          <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
            <p style="margin: 0; color: #065F46; font-size: 14px; font-weight: 600;">
              ✓ Account Status: Unblocked & Active
            </p>
          </div>

          <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
            You can now log in and resume using all features and services on Slotflow without restriction.
          </p>

          ${
            data.reason
              ? `
              <div style="margin: 20px 0;">
                <p style="margin: 0 0 6px 0; color: #212529; font-weight: 600; font-size: 14px;">Additional Note:</p>
                <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">${data.reason}</p>
              </div>
              `
              : ""
          }

          <!-- CTA Button for Unblocked Users -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
            <tr>
              <td align="center" style="border-radius: 8px; background-color: #635BFF;">
                <a href="https://slotflow.com/auth/login" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
                  Log In to Slotflow &rarr;
                </a>
              </td>
            </tr>
          </table>

          <!-- Help Info -->
          <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
            <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
              If you have any questions or encounter any issues signing back in, reach out to us at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
            </p>
          </div>
          `
      }
    `,
  },

  // admin give or revoke trust tag for the provider
  accountTrustStatus: {
    subject: (data: Omit<SendAccountTrustStatusEventInput, "templateKey" | "email">) =>
      data.trusted
        ? "Your Slotflow account has been marked as Trusted"
        : "Update Regarding Your Slotflow Account Trust Status",

    renderBody: (data: Omit<SendAccountTrustStatusEventInput, "templateKey" | "email">) => `
      ${
        data.trusted
          ? `
          <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
            Congratulations! Your service provider account has been <strong>marked as Trusted</strong> on Slotflow.
          </p>

          <!-- Trusted Badge -->
          <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
            <p style="margin: 0; color: #065F46; font-size: 14px; font-weight: 600;">
              ✓ Trust Status: Trusted Provider
            </p>
          </div>

          <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
            This status increases your credibility and helps clients choose your services with confidence. Keep delivering great service to maintain your trusted badge!
          </p>

          <!-- CTA Button -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
            <tr>
              <td align="center" style="border-radius: 8px; background-color: #635BFF;">
                <a href="https://slotflow.com/dashboard" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
                  Go to Provider Dashboard &rarr;
                </a>
              </td>
            </tr>
          </table>
          `
          : `
          <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
            We are writing to inform you that your service provider account is <strong>no longer marked as Trusted</strong> on Slotflow.
          </p>

          <!-- Untrusted Badge -->
          <div style="background-color: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
            <p style="margin: 0; color: #92400E; font-size: 14px; font-weight: 600;">
              ! Trust Status: Standard Provider
            </p>
          </div>

          ${
            data.reason
              ? `
              <div style="margin: 20px 0;">
                <p style="margin: 0 0 6px 0; color: #212529; font-weight: 600; font-size: 14px;">Reason for Change:</p>
                <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">${data.reason}</p>
              </div>
              `
              : ""
          }

          <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
            Please review your account details and service feedback.
          </p>

          <!-- Help Info -->
          <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
            <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
              If you believe this change was made in error or have any questions, reach out to support at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
            </p>
          </div>
          `
      }
    `,
  },

  // provider confirm or reject appointment, and the user will get the email
  providerAppointmentStatusForUser: {
    subject: (data: Omit<SendAppointmentStatusChangeForUserEventInput, "templateKey" | "email">) =>
      data.appointmentStatus === AppointmentStatus.CONFIRMED
        ? "Your Slotflow Appointment Has Been Confirmed"
        : "Update: Your Slotflow Appointment Request Was Declined",

    renderBody: (
      data: Omit<SendAppointmentStatusChangeForUserEventInput, "templateKey" | "email">,
    ) => {
      const isConfirmed = data.appointmentStatus === AppointmentStatus.CONFIRMED;
      const isOfflineMode = data.appointmentMode?.toLowerCase() === "offline";
      const hasAddress = Boolean(data.address && data.address.addressLine);

      // Dynamic Address Section Renderer
      const renderLocationBlock = () => {
        // 1. Online mode or non-offline mode -> Do not render address
        if (!isOfflineMode) return "";

        // 2. Offline mode WITH address -> Location Card
        if (hasAddress && data.address) {
          const { addressLine, landmark, city, state, pincode, googleMapsUrl } = data.address;

          return `
          <!-- Premium Location Box -->
          <div style="border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin: 24px 0; background-color: #FFFFFF; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
              <tr>
                <td style="vertical-align: top; width: 28px; padding-right: 12px;">
                  <span style="font-size: 20px; line-height: 1;">📍</span>
                </td>
                <td style="vertical-align: top;">
                  <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #64748B;">
                    Service Location
                  </p>
                  <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #0F172A; line-height: 1.4;">
                    ${addressLine}${landmark ? `, ${landmark}` : ""}
                  </p>
                  <p style="margin: 0 0 16px 0; font-size: 14px; color: #475569; line-height: 1.4;">
                    ${city}, ${state} - ${pincode}
                  </p>
                  
                  ${
                    googleMapsUrl
                      ? `
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="border-radius: 6px; background-color: #EFF6FF; border: 1px solid #BFDBFE;">
                          <a href="${googleMapsUrl}" target="_blank" style="font-size: 13px; font-weight: 600; color: #1D4ED8; text-decoration: none; padding: 8px 16px; display: inline-block;">
                            Get Directions on Google Maps &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  `
                      : ""
                  }
                </td>
              </tr>
            </table>
          </div>
        `;
        }

        // 3. Offline mode WITHOUT address -> Fallback Support Note
        return `
        <!-- Missing Address Warning Box -->
        <div style="border: 1px dashed #F59E0B; border-radius: 10px; padding: 16px 20px; margin: 24px 0; background-color: #FFFBEB;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td style="vertical-align: top; width: 24px; padding-right: 10px;">
                <span style="font-size: 16px;">⚠️</span>
              </td>
              <td style="vertical-align: top;">
                <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 600; color: #B45309;">
                  Location Details Missing
                </p>
                <p style="margin: 0; color: #92400E; font-size: 13px; line-height: 1.5;">
                  Address details are currently unavailable for this offline appointment. Please contact support at <a href="mailto:slotflow.booking@gmail.com" style="color: #B45309; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a> to retrieve location information.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `;
      };

      return `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        ${
          isConfirmed
            ? "Great news! Your service provider has <strong>confirmed</strong> your appointment request."
            : "We are writing to let you know that your appointment request was <strong>declined</strong> by the service provider."
        }
      </p>

      <!-- Status Badge -->
      <div style="background-color: ${isConfirmed ? "#ECFDF5" : "#FEF2F2"}; border: 1px solid ${isConfirmed ? "#A7F3D0" : "#FCA5A5"}; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0; color: ${isConfirmed ? "#065F46" : "#991B1B"}; font-size: 14px; font-weight: 600;">
          Status: ${isConfirmed ? "Confirmed by Provider" : "Rejected by Provider"}
        </p>
      </div>

      <!-- Appointment Details Box -->
      <div style="border: 1px solid #E9ECEF; border-radius: 8px; padding: 18px 20px; margin: 20px 0; background-color: #FAFAFA;">
        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #212529;">Appointment Details:</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: #495057;">
          <tr>
            <td style="padding: 4px 0; width: 30%; font-weight: 500;">Date:</td>
            <td style="padding: 4px 0; font-weight: 600; color: #212529;">${data.appointmentDate}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: 500;">Time:</td>
            <td style="padding: 4px 0; font-weight: 600; color: #212529;">${data.appointmentTime}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: 500;">Mode:</td>
            <td style="padding: 4px 0; font-weight: 600; color: #212529;">${data.appointmentMode}</td>
          </tr>
        </table>
      </div>

      <!-- Address / Location Section -->
      ${renderLocationBlock()}

      ${
        !isConfirmed && data.reason
          ? `
        <div style="margin: 20px 0;">
          <p style="margin: 0 0 6px 0; color: #212529; font-weight: 600; font-size: 14px;">Reason Provided:</p>
          <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">${data.reason}</p>
        </div>
        `
          : ""
      }

      <!-- Primary CTA -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
        <tr>
          <td align="center" style="border-radius: 8px; background-color: #635BFF;">
            <a href="https://slotflow.com/bookings" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
              ${isConfirmed ? "View Appointment Details &rarr;" : "Browse Other Providers &rarr;"}
            </a>
          </td>
        </tr>
      </table>

      <!-- Support Info -->
      <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
        <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
          If you have any questions or need further assistance, please reach out to us at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
        </p>
      </div>
    `;
    },
  },

  // user or provider connecting app
  appConnect: {
    subject: (data: Omit<SendAppConnectEventInput, "templateKey" | "email">) =>
      `Your Slotflow account was connected to ${formatString(data.appConnect)}`,

    renderBody: (data: Omit<SendAppConnectEventInput, "templateKey" | "email">) => {
      const appName = formatString(data.appConnect);

      return `
        <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
          Your <strong>Slotflow</strong> account has been successfully connected to <strong>${appName}</strong>.
        </p>

        <!-- Status Badge -->
        <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
          <p style="margin: 0; color: #065F46; font-size: 14px; font-weight: 600;">
            ✓ Integration Active: ${appName}
          </p>
        </div>

        <p style="margin: 0 0 16px 0; color: #495057; font-size: 15px; line-height: 1.6;">
          You can now use ${appName} directly within your Slotflow workflow. You can manage or disconnect integrations at any time from your account settings.
        </p>

        <!-- Action Button -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #635BFF;">
              <a href="https://slotflow.com/settings/integrations" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
                Manage Integrations &rarr;
              </a>
            </td>
          </tr>
        </table>

        <!-- Security Warning -->
        <div style="background-color: #FFF5F5; border: 1px solid #FEB2B2; border-radius: 8px; padding: 16px 20px; margin-top: 24px;">
          <p style="margin: 0 0 6px 0; color: #C53030; font-weight: 600; font-size: 14px;">
            Didn't connect this service?
          </p>
          <p style="margin: 0; color: #9B2C2C; font-size: 13px; line-height: 1.5;">
            If you did not authorize this connection, please disconnect it immediately in your settings and contact our support team at <a href="mailto:slotflow.booking@gmail.com" style="color: #9B2C2C; font-weight: 600; text-decoration: underline;">slotflow.booking@gmail.com</a>.
          </p>
        </div>
      `;
    },
  },

  // provider subscription payment success
  providerSubscriptionPaymentSuccess: {
    subject: () => "Receipt for Your Slotflow Provider Subscription",

    renderBody: (
      data: Omit<SendProviderSubscriptionPaymentSuccessEventInput, "templateKey" | "email">,
    ) => `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        Thank you for your payment! Your provider subscription on <strong>Slotflow</strong> is active and up to date.
      </p>

      <!-- Payment Success Status Badge -->
      <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0; color: #065F46; font-size: 14px; font-weight: 600;">
          ✓ Payment Successful
        </p>
      </div>

      <!-- Receipt Breakdown Table -->
      <div style="border: 1px solid #E9ECEF; border-radius: 8px; padding: 18px 20px; margin: 20px 0; background-color: #FAFAFA;">
        <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #212529;">Transaction Details:</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: #495057;">
          <tr>
            <td style="padding: 6px 0; width: 40%; font-weight: 500;">Payment For:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">Provider Subscription</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Amount Paid:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #635BFF; font-size: 1.05em;">$${data.totalAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Transaction ID:</td>
            <td style="padding: 6px 0; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; color: #212529;">${data.transactionId}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Payment Date:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.paymentDate}</td>
          </tr>
        </table>
      </div>

      <!-- Action Buttons -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
        <tr>
          ${
            data.receiptUrl
              ? `
              <td style="border-radius: 8px; background-color: #635BFF; padding-right: 12px;">
                <a href="${data.receiptUrl}" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                  View / Download Receipt &rarr;
                </a>
              </td>
              `
              : ""
          }
          <td style="border-radius: 8px; background-color: #F1F3F5;">
            <a href="https://slotflow.com/subscriptions" target="_blank" style="font-size: 14px; font-weight: 600; color: #212529; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
              Manage Subscription
            </a>
          </td>
        </tr>
      </table>

      <!-- Support Info -->
      <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
        <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
          If you have any billing questions or need tax details updated on your invoices, reach out to support at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
        </p>
      </div>
    `,
  },

  // user appointment booking payment success
  userBookingPaymentSuccess: {
    subject: () => "Payment Confirmed — Your Slotflow Booking Receipt",

    renderBody: (data: Omit<SendBookingPaymentSuccessEventInput, "templateKey" | "email">) => `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        Thank you for your payment! We have received your payment for your appointment booking on <strong>Slotflow</strong>.
      </p>

      <!-- Payment Success Badge -->
      <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0; color: #065F46; font-size: 14px; font-weight: 600;">
          ✓ Payment Received & Booking Confirmed
        </p>
      </div>

      <!-- Receipt Summary Box -->
      <div style="border: 1px solid #E9ECEF; border-radius: 8px; padding: 18px 20px; margin: 20px 0; background-color: #FAFAFA;">
        <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #212529;">Payment Receipt Details:</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: #495057;">
          <tr>
            <td style="padding: 6px 0; width: 40%; font-weight: 500;">Amount Paid:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #635BFF; font-size: 1.05em;">$${data.totalAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Transaction ID:</td>
            <td style="padding: 6px 0; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; color: #212529;">${data.transactionId}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Payment Date:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.paymentDate}</td>
          </tr>
        </table>
      </div>

      <!-- Action Buttons -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
        <tr>
          ${
            data.receiptUrl
              ? `
              <td style="border-radius: 8px; background-color: #635BFF; padding-right: 12px;">
                <a href="${data.receiptUrl}" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
                  View / Download Receipt &rarr;
                </a>
              </td>
              `
              : ""
          }
          <td style="border-radius: 8px; background-color: #F1F3F5;">
            <a href="https://slotflow.com/bookings" target="_blank" style="font-size: 14px; font-weight: 600; color: #212529; text-decoration: none; padding: 12px 24px; border-radius: 8px; display: inline-block;">
              View My Bookings
            </a>
          </td>
        </tr>
      </table>

      <!-- Support Info -->
      <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
        <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
          If you have any questions regarding this payment or need help with your booking, feel free to contact us at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
        </p>
      </div>
    `,
  },

  // provider plan subscribed
  planSubscribed: {
    subject: (data: Omit<SendPlanSubscribedEventInput, "templateKey" | "email">) => {
      const isTrial = data.isTrial === "true";
      return isTrial
        ? `Your ${data.subscribedPlan} Free Trial Is Now Active!`
        : `Your ${data.subscribedPlan} Subscription Is Active!`;
    },

    renderBody: (data: Omit<SendPlanSubscribedEventInput, "templateKey" | "email">) => {
      const isTrial = data.isTrial === "true";

      return `
        <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
          ${
            isTrial
              ? `Your free trial for the <strong>${data.subscribedPlan}</strong> plan has officially started! Enjoy full access to all trial features on <strong>Slotflow</strong>.`
              : `Your subscription to the <strong>${data.subscribedPlan}</strong> plan is now active! Thank you for choosing <strong>Slotflow</strong> to power your services.`
          }
        </p>

        <!-- Status Badge -->
        <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
          <p style="margin: 0; color: #065F46; font-size: 14px; font-weight: 600;">
            ✓ ${isTrial ? "Trial Period Active" : "Subscription Active"}
          </p>
        </div>

        <!-- Plan Period Details Table -->
        <div style="border: 1px solid #E9ECEF; border-radius: 8px; padding: 18px 20px; margin: 20px 0; background-color: #FAFAFA;">
          <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #212529;">Plan Summary:</p>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: #495057;">
            <tr>
              <td style="padding: 6px 0; width: 40%; font-weight: 500;">Subscribed Plan:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #635BFF;">${data.subscribedPlan}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 500;">Start Date:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.startDate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: 500;">${isTrial ? "Trial End Date:" : "Renewal Date:"}</td>
              <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.endDate}</td>
            </tr>
          </table>
        </div>

        <!-- Action Button -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
          <tr>
            <td align="center" style="border-radius: 8px; background-color: #635BFF;">
              <a href="https://slotflow.com/dashboard" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
                Go to Provider Dashboard &rarr;
              </a>
            </td>
          </tr>
        </table>

        <!-- Support Box -->
        <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
          <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
            If you have any questions or need to manage your subscription plan, feel free to reach out to us at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
          </p>
        </div>
      `;
    },
  },

  // user books a slot
  slotBooked: {
    subject: (data: Omit<SendSlotBookedEventInput, "templateKey" | "email">) =>
      `Slot Booked — Awaiting Confirmation from ${data.providerName}`,

    renderBody: (data: Omit<SendSlotBookedEventInput, "templateKey" | "email">) => `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        Your appointment request with <strong>${data.providerName}</strong> has been received!
      </p>

      <!-- Status Info Box -->
      <div style="background-color: #FEF3C7; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0 0 6px 0; color: #92400E; font-size: 14px; font-weight: 600;">
          ⏳ Status: Pending Provider Confirmation
        </p>
        <p style="margin: 0; color: #78350F; font-size: 13px; line-height: 1.5;">
          Your requested slot is reserved while <strong>${data.providerName}</strong> reviews the request. We will notify you by email as soon as they respond.
        </p>
      </div>

      <!-- Booking Summary Table -->
      <div style="border: 1px solid #E9ECEF; border-radius: 8px; padding: 18px 20px; margin: 20px 0; background-color: #FAFAFA;">
        <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #212529;">Requested Booking Details:</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: #495057;">
          <tr>
            <td style="padding: 6px 0; width: 40%; font-weight: 500;">Provider:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.providerName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Date & Time:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.appointmentDate}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Mode:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.appointmentMode}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Current Status:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #D97706;">${data.appointmentStatus}</td>
          </tr>
        </table>
      </div>

      <!-- Action Button -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
        <tr>
          <td align="center" style="border-radius: 8px; background-color: #635BFF;">
            <a href="https://slotflow.com/bookings" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
              View My Bookings &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- Support Box -->
      <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
        <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
          If you need to update or cancel this request before confirmation, manage your booking on <a href="https://slotflow.com/bookings" style="color: #635BFF; font-weight: 600; text-decoration: underline;">Slotflow</a> or contact support at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
        </p>
      </div>
    `,
  },

  // provider got a booking
  gotAnAppointment: {
    subject: (data: Omit<SendGotAnAppointmentEventInput, "templateKey" | "email">) =>
      `New Appointment Booking Request from ${data.customerName}`,

    renderBody: (data: Omit<SendGotAnAppointmentEventInput, "templateKey" | "email">) => `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        You have received a new appointment booking request from <strong>${data.customerName}</strong>!
      </p>

      <!-- Status Info Box -->
      <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0 0 4px 0; color: #065F46; font-size: 14px; font-weight: 600;">
          🗓️ Action Required: Confirm or Decline Booking
        </p>
        <p style="margin: 0; color: #047857; font-size: 13px; line-height: 1.5;">
          Please review the booking details below and respond through your provider dashboard.
        </p>
      </div>

      <!-- Booking Details Table -->
      <div style="border: 1px solid #E9ECEF; border-radius: 8px; padding: 18px 20px; margin: 20px 0; background-color: #FAFAFA;">
        <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #212529;">Appointment Summary:</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: #495057;">
          <tr>
            <td style="padding: 6px 0; width: 40%; font-weight: 500;">Customer Name:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Date:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.appointmentDate}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Time:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.appointmentTime}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Mode:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.appointmentMode}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Current Status:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #635BFF;">${data.appointmentStatus}</td>
          </tr>
        </table>
      </div>

      <!-- Provider Warning Notice -->
      <p style="margin: 16px 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
        <em>Note: Rejecting appointments frequently or leaving requests pending for an extended time may impact your provider ranking and verification standing.</em>
      </p>

      <!-- Action Button -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
        <tr>
          <td align="center" style="border-radius: 8px; background-color: #635BFF;">
            <a href="https://slotflow.com/bookings" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
              Manage Appointment &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- Support Box -->
      <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
        <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
          If you run into any issues managing your schedule or accepting bookings, reach out to support at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
        </p>
      </div>
    `,
  },

  userBookingRefundPaymentSuccess: {
    subject: (
      _data: Omit<SendUserBookingRefundPaymentSuccessEventInput, "templateKey" | "email">,
    ) => `Refund Processed Successfully — Slotflow`,

    renderBody: (
      data: Omit<SendUserBookingRefundPaymentSuccessEventInput, "templateKey" | "email">,
    ) => `
      <p style="margin: 0 0 16px 0; color: #212529; font-size: 15px; line-height: 1.6;">
        Your refund for your booking has been processed successfully.
      </p>

      <!-- Status Info Box -->
      <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0 0 4px 0; color: #065F46; font-size: 14px; font-weight: 600;">
          ✓ Refund Completed
        </p>
        <p style="margin: 0; color: #047857; font-size: 13px; line-height: 1.5;">
          The requested amount has been credited to your original payment method. Depending on your bank, it may take 5–7 business days to reflect in your statement.
        </p>
      </div>

      <!-- Refund Summary Details -->
      <div style="border: 1px solid #E9ECEF; border-radius: 8px; padding: 18px 20px; margin: 20px 0; background-color: #FAFAFA;">
        <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #212529;">Refund Breakdown:</p>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; font-size: 14px; color: #495057;">
          <tr>
            <td style="padding: 6px 0; width: 40%; font-weight: 500;">Refund Amount:</td>
            <td style="padding: 6px 0; font-weight: 700; color: #059669;">$${data.refundAmount}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Refund Date:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #212529;">${data.refundDate}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 500;">Transaction ID:</td>
            <td style="padding: 6px 0; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; color: #495057;">
              ${data.transactionId}
            </td>
          </tr>
        </table>
      </div>

      <!-- Action Button -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
        <tr>
          <td align="center" style="border-radius: 8px; background-color: #635BFF;">
            <a href="https://slotflow.com/bookings" target="_blank" style="font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block;">
              View Booking History &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- Support Box -->
      <div style="background-color: #F8F9FA; border-radius: 8px; padding: 16px 20px; margin-top: 24px; border: 1px solid #E9ECEF;">
        <p style="margin: 0; color: #6C757D; font-size: 13px; line-height: 1.5;">
          If you have not received your funds after 7 business days, please contact our support team with your transaction ID at <a href="mailto:slotflow.booking@gmail.com" style="color: #635BFF; text-decoration: underline; font-weight: 600;">slotflow.booking@gmail.com</a>.
        </p>
      </div>
    `,
  },
};
