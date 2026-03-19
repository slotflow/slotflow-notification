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
  };
};


// send welcome event
export class SendWelcomeEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendWelcomeEvent) {
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
  };
};

// send password reset event
export class SendPasswordResetEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendResetPasswordEvent) {
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
  };
};

// send account block status event
export class SendAccountBlockStatusChangeEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendAccountBlockStatusEvent) {
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
  };
};

// send admin provider review event
export class SendAdminProviderReviewEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendAdminProviderReviewEvent) {
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
  };
};

// send account trust status event
export class SendAcountTrustStatusChangeEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendAccountTrustStatusEvent) {
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
  };
};



// send appointment status change event
export class SendAppointmentStatusChangeEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendAppointmentStatusChangeForUserEvent) {
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
  };
};

// send app connect event
export class SendAppConnectEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendAppConnectEvent) {
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
  };
};

export class SendProviderTrialSubscriptionEmailUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendProviderTrialSubscriptionEvent) {
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
  };
};

// send provider payment event
export class SendSubscriptionPaymentSuccessEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendProviderPaymentEvent) {
    const { email, name, totalAmount, paymentDate, paymentStatus, transactionId, paymentFor, recieptUrl } = payload;

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
      recieptUrl
    )}
    `;

    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject,
      html: emailMainTemplate.html(subject, htmlContent),
    });
  };
};

// send subscription completed
export class SendPlanSubscribedEventUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(payload: SendPlanSubscribedEvent) {
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
    })
  }
}

// send booking payment success
export class SendBookingPaymentSuccessEventUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(payload: SendBookingPaymentSuccessEvent) {
    const { email, name, totalAmount, paymentDate, paymentStatus, transactionId, paymentFor, recieptUrl } = payload;

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
      recieptUrl
    )}
    `;

    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject,
      html: emailMainTemplate.html(subject, htmlContent),
    });
  };
};

// send booking completed
export class SendSlotBookedEventUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(payload: SendSlotBookedEvent) {
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
    })
  }
}

//
export class SendGotAnAppointmentEmailUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) { }

  async execute(payload: SendGotAnAppointmentEvent) {
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
    })
  }
}

























//  Edit 
// send got appointment event
// export class SendGotAppointmentEventUseCase {
//   constructor(
//     private emailService: IEmailService
//   ) { };

//   async execute(payload: SendGotAppointmentEvent) {
//     const { appointmentDate, appointmentDuration, appointmentMode, appointmentTime, email, name } = payload;

//     const subject = gotAppointmentEmailTemplate.subject;

//     const htmlContent = `
//       ${gotAppointmentEmailTemplate.head(name)}
//       ${gotAppointmentEmailTemplate.body(
//       appointmentDate,
//       appointmentTime,
//       appointmentDuration,
//       appointmentMode
//     )}
//     `;

//     await this.emailService.sendEmailViaNodemailer({
//       to: email,
//       subject,
//       html: emailMainTemplate.html(subject, htmlContent),
//     });
//   };
// };

// send user payment event
export class SendUserPaymentEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendUserPaymentEvent) {
    const { email, name, amount, transactionId, paymentDate, appointmentDate, paymentStatus, paymentFor } = payload;

    const isValidEvent =
      (paymentStatus === PaymentStatus.PAID &&
        paymentFor === PaymentFor.APPOINTMENT_BOOKING) ||
      (paymentStatus === PaymentStatus.REFUNDED &&
        paymentFor === PaymentFor.CANCEL_BOOKING);

    if (!isValidEvent) {
      return;
    }

    const subject = userPaymentStatusEmailTemplate.subject(
      paymentStatus,
    );

    const htmlContent = `
      ${userPaymentStatusEmailTemplate.head(name, paymentStatus)}
      ${userPaymentStatusEmailTemplate.body(
      amount,
      transactionId,
      paymentDate,
      appointmentDate,
      paymentStatus
    )}
    `;

    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject,
      html: emailMainTemplate.html(subject, htmlContent),
    });
  };
};

// send provider payout event
export class SendProviderPayoutEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async execute(payload: SendProviderPayoutEvent) {
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
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject,
      html: emailMainTemplate.html(subject, htmlContent),
    });
  };
};