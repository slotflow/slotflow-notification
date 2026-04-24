import { log } from "../../../shared/logger/logger";
import { IEmailService } from "../../../domain/interfaces/services/IEmail.service";
import { AppointmentStatus, PaymentFor, PaymentStatus } from "../../../domain/enums/enum";
import { SendOtpEvent, SendAdminProviderReviewEvent, SendWelcomeEvent, SendAccountBlockStatusEvent, SendAccountTrustStatusEvent, SendAppointmentStatusChangeForUserEvent, SendUserPaymentEvent, SendProviderPaymentEvent, SendProviderPayoutEvent, SendAppConnectEvent, SendProviderTrialSubscriptionEvent, SendResetPasswordEvent, SendPlanSubscribedEvent, SendSlotBookedEvent, SendBookingPaymentSuccessEvent, SendGotAnAppointmentEvent } from "../../dtos/kafka.dtos";
import { emailMainTemplate, otpEmailTemplate, providerPayoutEmailTemplate, welcomeEmailTemplate, adminProviderReviewEmailTemplate, accountBlockStatusEmailTemplate, accountTrustStatusEmailTemplate, appointmentStatusEmailTemplate, userPaymentStatusEmailTemplate, providerSubscriptionPaymentEmailTemplate, appConnectEmailTemplate, providerTrialSubscriptionEmailTemplate, passwordResetEmailTemplate, planSubscribedEmailTemplate, slotBookedEmailTemplate, bookingPaymentSuccessEmailTemplate, gotAnAppointmentEmailTemplate } from "../../../shared/utils/constants";

// send otp event for registration and password update
export class SendOtpEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendOtpEvent) {
    try {

      const { email, otp, purpose, name } = payload;
      
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

  async execute(payload: SendWelcomeEvent) {
    try {

      const { email, name, role } = payload;
      
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

  async execute(payload: SendResetPasswordEvent) {
    try{
    const { email, name } = payload;

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

  async execute(payload: SendAccountBlockStatusEvent) {
    try{
    const { blocked, email, name, reason } = payload;

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

  async execute(payload: SendAdminProviderReviewEvent) {
    try {
    const { email, name, status, reason } = payload;

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

  async execute(payload: SendAccountTrustStatusEvent) {
    try {
    const { trusted, email, name, reason } = payload;

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

  async execute(payload: SendAppointmentStatusChangeForUserEvent) {
    try{
    const { email, name, appointmentDate, appointmentMode, appointmentTime, appointmentStatus } = payload;

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

  async execute(payload: SendAppConnectEvent) {
    try{
    const { email, name, appConnect } = payload;

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

  async execute(payload: SendProviderTrialSubscriptionEvent) {
    try{
    const { email, name, startDate, endDate } = payload;

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

  async execute(payload: SendProviderPaymentEvent) {
    try{
    const { email, name, totalAmount, paymentDate, paymentStatus, transactionId, paymentFor, receiptUrl } = payload;

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
export class SendPlanSubscribedEventUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(payload: SendPlanSubscribedEvent) {
    try{
    const { email, name, subscribedPlan, startDate, endDate } = payload;

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
    log.error("SendPlanSubscribedEventUseCase failed : ", error as Error);
  }
  }
}

// send booking payment success
export class SendBookingPaymentSuccessEventUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(payload: SendBookingPaymentSuccessEvent) {
    try{
    const { email, name, totalAmount, paymentDate, paymentStatus, transactionId, paymentFor, receiptUrl } = payload;

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

  async execute(payload: SendSlotBookedEvent) {
    try {
    const { email, name, appointmentDate, appointmentMode, appointmentStatus } = payload;

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

//
export class SendGotAnAppointmentEmailUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(payload: SendGotAnAppointmentEvent) {
    try {
    const { email, name, appointmentDate, appointmentMode, appointmentStatus } = payload;

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

  async execute(payload: SendProviderPayoutEvent) {
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