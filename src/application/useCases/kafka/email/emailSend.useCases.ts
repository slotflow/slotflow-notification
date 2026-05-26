import { log } from "../../../../shared/logger/logger";
import { IEmailService } from "../../../../domain/interfaces/services/IEmail.service";
import { AppointmentStatus, PaymentFor, PaymentStatus } from "../../../../domain/enums/enum";
import { SendOtpEventInput, SendAdminProviderReviewEventInput, SendWelcomeEventInput, SendAccountBlockStatusEventInput, SendAccountTrustStatusEventInput, SendAppointmentStatusChangeForUserEventInput, SendUserPaymentEventInput, SendProviderPaymentEventInput, SendProviderPayoutEventInput, SendAppConnectEventInput, SendProviderTrialSubscriptionEventInput, SendResetPasswordEventInput, SendPlanSubscribedEventInput, SendSlotBookedEventInput, SendBookingPaymentSuccessEventInput, SendGotAnAppointmentEventInput } from "../../../dtos/kafka.dtos";
import { emailMainTemplate, otpEmailTemplate, providerPayoutEmailTemplate, welcomeEmailTemplate, adminProviderReviewEmailTemplate, accountBlockStatusEmailTemplate, accountTrustStatusEmailTemplate, appointmentStatusEmailTemplate, userPaymentStatusEmailTemplate, providerSubscriptionPaymentEmailTemplate, appConnectEmailTemplate, providerTrialSubscriptionEmailTemplate, passwordResetEmailTemplate, planSubscribedEmailTemplate, slotBookedEmailTemplate, bookingPaymentSuccessEmailTemplate, gotAnAppointmentEmailTemplate } from "../../../../shared/utils/constants";

// send otp event for registration and password update
export class SendOtpEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendOtpEventInput) {
    try {

      const { email, otp, purpose, name } = input;

      const subject = otpEmailTemplate.subject(purpose);

      const htmlContent = `
      ${otpEmailTemplate.head(name)}
      ${otpEmailTemplate.body(purpose, otp)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendOtpEmailUseCase failed : ", error as Error);
    }
  };
};


// send welcome event
export class SendWelcomeEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendWelcomeEventInput) {
    try {

      const { email, name, role } = input;

      const subject = welcomeEmailTemplate.subject();

      const htmlContent = `
      ${welcomeEmailTemplate.head(name)}
      ${welcomeEmailTemplate.body(role)}
      `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendWelcomeEmailUseCase failed : ", error as Error);
    }
  };
};

// send password reset event
export class SendPasswordResetEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendResetPasswordEventInput) {
    try {
      const { email, name } = input;

      const subject = passwordResetEmailTemplate.subject();

      const htmlContent = `
      ${passwordResetEmailTemplate.head(name)}
      ${passwordResetEmailTemplate.body()}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendPasswordResetEmailUseCase failed : ", error as Error);
    }
  };
};

// send account block status event
export class SendAccountBlockStatusChangeEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendAccountBlockStatusEventInput) {
    try {
      const { blocked, email, name, reason } = input;

      const subject = accountBlockStatusEmailTemplate.subject(blocked);

      const htmlContent = `
      ${accountBlockStatusEmailTemplate.head(name)}
      ${accountBlockStatusEmailTemplate.body(blocked, reason)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendAccountBlockStatusChangeEmailUseCase failed : ", error as Error);
    }
  };
};

// send admin provider review event
export class SendAdminProviderReviewEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendAdminProviderReviewEventInput) {
    try {
      const { email, name, status, reason } = input;

      const subject = adminProviderReviewEmailTemplate.subject(status);

      const htmlContent = `
      ${adminProviderReviewEmailTemplate.head(name)}
      ${adminProviderReviewEmailTemplate.body(status, reason)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendAdminProviderReviewEmailUseCase failed : ", error as Error);
    }
  };
};

// send account trust status event
export class SendAcountTrustStatusChangeEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendAccountTrustStatusEventInput) {
    try {
      const { trusted, email, name, reason } = input;

      const subject = accountTrustStatusEmailTemplate.subject(trusted);

      const htmlContent = `
      ${accountTrustStatusEmailTemplate.head(name)}
      ${accountTrustStatusEmailTemplate.body(trusted, reason)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendAcountTrustStatusChangeEmailUseCase failed : ", error as Error);
    }
  };
};



// send appointment status change event
export class SendAppointmentStatusChangeEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendAppointmentStatusChangeForUserEventInput) {
    try {
      const { email, name, appointmentDate, appointmentMode, appointmentTime, appointmentStatus } = input;

      if (
        ![
          AppointmentStatus.CONFIRMED,
          AppointmentStatus.REJECTED_BY_PROVIDER,
          AppointmentStatus.CANCELLED,
        ].includes(appointmentStatus)
      ) {
        return;
      };

      const subject = appointmentStatusEmailTemplate.subject(appointmentStatus);

      const htmlContent = `
      ${appointmentStatusEmailTemplate.head(name, appointmentStatus)}
      ${appointmentStatusEmailTemplate.body(
        appointmentStatus,
        appointmentDate,
        appointmentTime,
        appointmentMode
      )}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendAppointmentStatusChangeEmailUseCase failed : ", error as Error);
    }
  };
};

// send app connect event
export class SendAppConnectEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendAppConnectEventInput) {
    try {
      const { email, name, appConnect } = input;

      const subject = appConnectEmailTemplate.subject(appConnect);

      const htmlContent = `
      ${appConnectEmailTemplate.head(name, appConnect)}
      ${appConnectEmailTemplate.body(appConnect)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendAppConnectEmailUseCase failed : ", error as Error);
    }
  };
};

export class SendProviderTrialSubscriptionEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendProviderTrialSubscriptionEventInput) {
    try {
      const { email, name, startDate, endDate } = input;

      const subject = providerTrialSubscriptionEmailTemplate.subject();

      const htmlContent = `
      ${providerTrialSubscriptionEmailTemplate.head(name)}
      ${providerTrialSubscriptionEmailTemplate.body(startDate, endDate)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendProviderTrialSubscriptionEmailUseCase failed : ", error as Error);
    }
  };
};

// send provider payment event
export class SendSubscriptionPaymentSuccessEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(input: SendProviderPaymentEventInput) {
    try {
      const { email, name, totalAmount, paymentDate, paymentStatus, transactionId, paymentFor, receiptUrl } = input;

      const isValidEvent =
        (paymentStatus === PaymentStatus.PAID &&
          paymentFor === PaymentFor.PROVIDER_SUBSCRIPTION) ||
        (paymentStatus === PaymentStatus.REFUNDED &&
          paymentFor === PaymentFor.CANCEL_SUBSCRIPTION);

      if (!isValidEvent) {
        return;
      }

      const subject =
        providerSubscriptionPaymentEmailTemplate.subject(paymentStatus);

      const htmlContent = `
      ${providerSubscriptionPaymentEmailTemplate.head(name, paymentStatus)}
      ${providerSubscriptionPaymentEmailTemplate.body(
        totalAmount,
        transactionId,
        paymentDate,
        paymentStatus,
        receiptUrl
      )}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendSubscriptionPaymentSuccessEventUseCase failed : ", error as Error);
    }
  };
};

// send subscription completed
export class SendPlanSubscribedEventInputUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(input: SendPlanSubscribedEventInput) {
    try {
      const { email, name, subscribedPlan, startDate, endDate } = input;

      const subject = planSubscribedEmailTemplate.subject();

      const htmlContent = `
    ${planSubscribedEmailTemplate.head(name)}
    ${planSubscribedEmailTemplate.body(subscribedPlan, startDate, endDate)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent)
      });
    } catch (error) {
      log.error("SendPlanSubscribedEventInputUseCase failed : ", error as Error);
    }
  }
}

// send booking payment success
export class SendBookingPaymentSuccessEventUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(input: SendBookingPaymentSuccessEventInput) {
    try {
      const { email, name, totalAmount, paymentDate, paymentStatus, transactionId, paymentFor, receiptUrl } = input;

      const isValidEvent =
        (paymentStatus === PaymentStatus.PAID &&
          paymentFor === PaymentFor.APPOINTMENT_BOOKING);

      if (!isValidEvent) {
        return;
      }

      const subject =
        bookingPaymentSuccessEmailTemplate.subject(paymentStatus);

      const htmlContent = `
      ${bookingPaymentSuccessEmailTemplate.head(name, paymentStatus)}
      ${bookingPaymentSuccessEmailTemplate.body(
        totalAmount,
        transactionId,
        paymentDate,
        paymentStatus,
        receiptUrl
      )}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendBookingPaymentSuccessEventUseCase failed : ", error as Error);
    }
  };
};

// send booking completed
export class SendSlotBookedEventUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(input: SendSlotBookedEventInput) {
    try {
      const { email, name, appointmentDate, appointmentMode, appointmentStatus } = input;

      const subject = slotBookedEmailTemplate.subject();

      const htmlContent = `
    ${slotBookedEmailTemplate.head(name)}
    ${slotBookedEmailTemplate.body(appointmentDate, appointmentMode, appointmentStatus)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent)
      });
    } catch (error) {
      log.error("SendSlotBookedEventUseCase failed : ", error as Error);
    }
  };
};

// send got appointment
export class SendGotAnAppointmentEmailUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(input: SendGotAnAppointmentEventInput) {
    try {
      const { email, name, appointmentDate, appointmentMode, appointmentStatus } = input;

      const subject = gotAnAppointmentEmailTemplate.subject();

      const htmlContent = `
    ${gotAnAppointmentEmailTemplate.head(name)}
    ${gotAnAppointmentEmailTemplate.body(appointmentDate, appointmentMode, appointmentStatus)}
    `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent)
      });
    } catch (error) {
      log.error("SendGotAnAppointmentEmailUseCase failed : ", error as Error);
    }
  };
};

























// TODO 

// user cancel booking refund email

// send provider payout event
export class SendProviderPayoutEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendProviderPayoutEventInput) {
    try {
      const { amount, email, name, payoutDate, transactionId } = payload;

      const subject = providerPayoutEmailTemplate.subject();

      const htmlContent = `
        ${providerPayoutEmailTemplate.head(name)}
        ${providerPayoutEmailTemplate.body(
        amount,
        transactionId,
        payoutDate
      )}
      `;

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: emailMainTemplate.html(subject, htmlContent),
      });
    } catch (error) {
      log.error("SendProviderPayoutEventUseCase failed : ", error as Error);
    }
  };
};