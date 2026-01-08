import { IEmailService } from "../service/IEmail.service";
import { AppointmentStatus, PaymentFor, PaymentStatus } from "../../domain/enums/enum";
import { SendOtpEvent, SendAdminProviderReviewEvent, SendGotAppointmentEvent, SendWelcomeEvent, SendAccountBlockStatusEvent, SendAccountTrustStatusEvent, SendAppointmentStatusChangeEvent, SendUserPaymentEvent, SendProviderPaymentEvent, SendProviderPayoutEvent, SendAppConnectEvent } from "../dtos/common";
import { emailMainTemplate, gotAppointmentEmailTemplate, otpEmailTemplate, providerPayoutEmailTemplate, welcomeEmailTemplate, adminProviderReviewEmailTemplate, accountBlockStatusEmailTemplate, accountTrustStatusEmailTemplate, appointmentStatusEmailTemplate, userPaymentStatusEmailTemplate, providerSubscriptionPaymentEmailTemplate, appConnectEmailTemplate } from "../../utils/constants";

// send otp event for registration and password update
export class SendOtpEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendOtpEvent) {
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
export class SendWelcomeEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendWelcomeEvent) {
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

// send admin provider review event
export class SendAdminProviderReviewEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendAdminProviderReviewEvent) {
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

// send account block status event
export class SendAccountBlockStatusChangeEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendAccountBlockStatusEvent) {
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

// send account trust status event
export class SendAcountTrustStatusChangeEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendAccountTrustStatusEvent) {
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

// send got appointment event
export class SendGotAppointmentEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendGotAppointmentEvent) {
    const { appointmentDate, appointmentDuration, appointmentMode, appointmentTime, email, name } = payload;

    const subject = gotAppointmentEmailTemplate.subject;

    const htmlContent = `
      ${gotAppointmentEmailTemplate.head(name)}
      ${gotAppointmentEmailTemplate.body(
      appointmentDate,
      appointmentTime,
      appointmentDuration,
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

// send appointment status change event
export class SendAppointmentStatusChangeEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendAppointmentStatusChangeEvent) {
    const { email, name, appointmentDate, appointmentDuration, appointmentMode, appointmentTime, appointmentStatus } = payload;

    if (
      ![
        AppointmentStatus.Confirmed,
        AppointmentStatus.RejectedByProvider,
        AppointmentStatus.Cancelled,
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
      appointmentDuration,
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

// send user payment event
export class SendUserPaymentEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendUserPaymentEvent) {
    const { email, name, amount, transactionId, paymentDate, appointmentDate, paymentStatus, paymentFor } = payload;

    const isValidEvent =
      (paymentStatus === PaymentStatus.Paid &&
        paymentFor === PaymentFor.AppointmentBooking) ||
      (paymentStatus === PaymentStatus.Refunded &&
        paymentFor === PaymentFor.CancelBooking);

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

// send provider payment event
export class SendProviderPaymentEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendProviderPaymentEvent) {
    const { email, name, amount, paymentDate, paymentStatus, subscriptionEndDate, subscriptionStartDate, transactionId, paymentFor } = payload;

    const isValidEvent =
      (paymentStatus === PaymentStatus.Paid &&
        paymentFor === PaymentFor.ProviderSubscription) ||
      (paymentStatus === PaymentStatus.Refunded &&
        paymentFor === PaymentFor.CancelSubscription);

    if (!isValidEvent) {
      return;
    }

    const formattedStartDate = new Date(
      subscriptionStartDate
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formattedEndDate = new Date(
      subscriptionEndDate
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const subject =
      providerSubscriptionPaymentEmailTemplate.subject(paymentStatus);

    const htmlContent = `
      ${providerSubscriptionPaymentEmailTemplate.head(name, paymentStatus)}
      ${providerSubscriptionPaymentEmailTemplate.body(
      amount,
      transactionId,
      paymentDate,
      formattedStartDate,
      formattedEndDate,
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

  async handle(payload: SendProviderPayoutEvent) {
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

// send app connect event
export class SendAppConnectEventUseCase {
  constructor(
    private emailService: IEmailService
  ) { };

  async handle(payload: SendAppConnectEvent) {
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
