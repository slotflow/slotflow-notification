import { IEmailService } from "../service/IEmail.service";
import { NotificationEventHandler, SendOtpEmail, SendEmailCommon } from "../dtos/common";
import { accountBlockedEmailTemplate, accountTrustedEmailTemplate, accountUnblockedEmailTemplate, accountUntrustedEmailTemplate, adminApprovedEmailTemplate, adminRejectedEmailTemplate, confirmAppointmentEmailTemplate, emailMainTemplate, googleConnectEmailTemplate, gotAppointmentEmailTemplate, otpEmailTemplate, providerPayoutEmailTemplate, providerStripeAccountEmailTemplate, providerSubscriptionPaymentEmailTemplate, rejectAppointmentEmailTemplate, userPaymentEmailTemplate, welcomeEmailTemplate } from "../../utils/constants";

export class SendOtpEmailUseCase implements NotificationEventHandler<SendOtpEmail> {
  constructor(private emailService: IEmailService) { };

  async handle({ email, otp }: SendOtpEmail) {
    const htmlContent = `${otpEmailTemplate.contentStart}${otp}${otpEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: otpEmailTemplate.subject,
      html: emailMainTemplate.html(otpEmailTemplate.subject,htmlContent),
    });
  };
};

export class SendWelcomeEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) { };

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${welcomeEmailTemplate.contentStart}${name}${welcomeEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: welcomeEmailTemplate.subject,
      html: emailMainTemplate.html(welcomeEmailTemplate.subject,htmlContent),
    });
  };
};

export class SendAdminApprovedEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${adminApprovedEmailTemplate.contentStart}${name}${adminApprovedEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: adminApprovedEmailTemplate.subject,
      html: emailMainTemplate.html(adminApprovedEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendAdminRejectedEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${adminRejectedEmailTemplate.contentStart}${name}${adminRejectedEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: adminRejectedEmailTemplate.subject,
      html: emailMainTemplate.html(adminRejectedEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendAccountBlockedEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${accountBlockedEmailTemplate.contentStart}${name}${accountBlockedEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: accountBlockedEmailTemplate.subject,
      html: emailMainTemplate.html(accountBlockedEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendAccountUnblockedEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${accountUnblockedEmailTemplate.contentStart}${name}${accountUnblockedEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: accountUnblockedEmailTemplate.subject,
      html: emailMainTemplate.html(accountUnblockedEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendAccountTrustedEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${accountTrustedEmailTemplate.contentStart}${name}${accountTrustedEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: accountTrustedEmailTemplate.subject,
      html: emailMainTemplate.html(accountTrustedEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendAccountUntrustedEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${accountUntrustedEmailTemplate.contentStart}${name}${accountUntrustedEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: accountUntrustedEmailTemplate.subject,
      html: emailMainTemplate.html(accountUntrustedEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendGotAppointmentEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${gotAppointmentEmailTemplate.contentStart}${name}${gotAppointmentEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: gotAppointmentEmailTemplate.subject,
      html: emailMainTemplate.html(gotAppointmentEmailTemplate.subject, htmlContent),
    });
  }
}

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

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${userPaymentEmailTemplate.contentStart}${name}${userPaymentEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: userPaymentEmailTemplate.subject,
      html: emailMainTemplate.html(userPaymentEmailTemplate.subject, htmlContent),
    });
  }
}

export class SendProviderSubscriptionPaymentEmailUseCase implements NotificationEventHandler<SendEmailCommon> {
  constructor(private emailService: IEmailService) {}

  async handle({ email, name }: SendEmailCommon) {
    const htmlContent = `${providerSubscriptionPaymentEmailTemplate.contentStart}${name}${providerSubscriptionPaymentEmailTemplate.contentEnd}`;
    await this.emailService.sendEmailViaNodemailer({
      to: email,
      subject: providerSubscriptionPaymentEmailTemplate.subject,
      html: emailMainTemplate.html(providerSubscriptionPaymentEmailTemplate.subject, htmlContent),
    });
  }
}

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
  }
}

