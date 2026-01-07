import { IEmailService } from "../service/IEmail.service";
import { NotificationEventHandler, SendOtpEvent, SendEmailCommon, SendAdminProviderReviewEvent, SendUserPaymentEmail, SendProviderGotAppointmentEvent, SendWelcomeEvent, SendAccountBlockStatusEvent, SendAccountTrustStatusEvent } from "../dtos/common";
import { confirmAppointmentEmailTemplate, emailMainTemplate, googleConnectEmailTemplate, gotAppointmentEmailTemplate, otpEmailTemplate, providerPayoutEmailTemplate, providerStripeAccountEmailTemplate, providerConfirmSubscriptionEmailTemplate, rejectAppointmentEmailTemplate, userPaymentEmailTemplate, welcomeEmailTemplate, adminProviderReviewEmailTemplate, accountBlockStatusEmailTemplate, accountTrustStatusEmailTemplate } from "../../utils/constants";

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
  ) {};

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
export class SendAccountBlockStatusEventUseCase {
  constructor(
    private emailService: IEmailService
  ) {};

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
export class SendAcountTrustStatusEventUseCase {
  constructor(
    private emailService: IEmailService
  ) {};

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
  ) {};

  async handle(payload: SendProviderGotAppointmentEvent) {
    const { appointmentDate , appointmentDuration, appointmentMode, appointmentTime, email, name} = payload;
    
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





export class SendConfirmAppointmentEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${confirmAppointmentEmailTemplate.contentStart}${name}${confirmAppointmentEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: confirmAppointmentEmailTemplate.subject,
      html: emailMainTemplate.html(confirmAppointmentEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendRejectAppointmentEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${rejectAppointmentEmailTemplate.contentStart}${name}${rejectAppointmentEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: rejectAppointmentEmailTemplate.subject,
      html: emailMainTemplate.html(rejectAppointmentEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendUserPaymentEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle(payload: SendUserPaymentEmail) {
    const { email, name, amount, transactionId, paymentDate, appointmentDate } = payload;
    const htmlContent = `
      ${userPaymentEmailTemplate.header.replace("{{name}}", name)}
      ${userPaymentEmailTemplate.details
        .replace("{{amount}}", amount.toString())
        .replace("{{transactionId}}", transactionId)
        .replace("{{paymentDate}}", paymentDate)
        .replace("{{appointmentDate}}", appointmentDate)
      }
      ${userPaymentEmailTemplate.footer}
    `;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: userPaymentEmailTemplate.subject,
      html: emailMainTemplate.html(userPaymentEmailTemplate.subject, htmlContent),
    });
  };
};

export class SendProviderConfirmSubscriptionEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle(payload: SendProviderConfirmSubscriptionEmail) {
    const { email, name, startDate, endDate, subscription, duration } = payload;
    
    const formattedStartDate = new Date(startDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formattedEndDate = new Date(endDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const htmlContent = `
      ${providerConfirmSubscriptionEmailTemplate.header.replace("{{name}}", name)}

      ${providerConfirmSubscriptionEmailTemplate.subscriptionBlock
        .replace("{{subscription}}", subscription)
        .replace("{{duration}}", duration + " days")
        .replace("{{startDate}}", formattedStartDate)
        .replace("{{endDate}}", formattedEndDate)
      }

      ${providerConfirmSubscriptionEmailTemplate.footer}
    `;
    
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: providerConfirmSubscriptionEmailTemplate.subject,
      html: emailMainTemplate.html(providerConfirmSubscriptionEmailTemplate.subject, htmlContent),
    });
  };
};

export class SendProviderPayoutEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${providerPayoutEmailTemplate.contentStart}${name}${providerPayoutEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: providerPayoutEmailTemplate.subject,
      html: emailMainTemplate.html(providerPayoutEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendProviderStripeAccountEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${providerStripeAccountEmailTemplate.contentStart}${name}${providerStripeAccountEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: providerStripeAccountEmailTemplate.subject,
      html: emailMainTemplate.html(providerStripeAccountEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendGoogleConnectEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${googleConnectEmailTemplate.contentStart}${name}${googleConnectEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: googleConnectEmailTemplate.subject,
      html: emailMainTemplate.html(googleConnectEmailTemplate.subject, htmlContent),
    });
  };
};

