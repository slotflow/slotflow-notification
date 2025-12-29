import { kafkaConfig } from "../config/env";
import {
  SendOtpEmailUseCase,
  SendWelcomeEmailUseCase,
  SendUserPaymentEmailUseCase,
  SendAdminApprovedEmailUseCase,
  SendAdminRejectedEmailUseCase,
  SendGoogleConnectEmailUseCase,
  SendAccountBlockedEmailUseCase,
  SendAccountTrustedEmailUseCase,
  SendGotAppointmentEmailUseCase,
  SendProviderPayoutEmailUseCase,
  SendAccountUnblockedEmailUseCase,
  SendAccountUntrustedEmailUseCase,
  SendRejectAppointmentEmailUseCase,
  SendConfirmAppointmentEmailUseCase,
  SendProviderStripeAccountEmailUseCase,
  SendProviderSubscriptionPaymentEmailUseCase,
} from "../application/useCases/emailSend.useCases";
import { EmailService } from "../infrastructure/services/email.service";
import { KafkaClientAdapter } from "../infrastructure/messaging/kafkaClientAdapter";

export class KafkaConsumerController {

  constructor(
    private kafkaClient: KafkaClientAdapter
  ) {};

  async startListening(): Promise<void> {
    const emailService = new EmailService();

    const handlers = {
      sendOtp: new SendOtpEmailUseCase(emailService),
      registerSuccess: new SendWelcomeEmailUseCase(emailService),
      adminApproved: new SendAdminApprovedEmailUseCase(emailService),
      adminRejected: new SendAdminRejectedEmailUseCase(emailService),
      accountBlocked: new SendAccountBlockedEmailUseCase(emailService),
      accountUnblocked: new SendAccountUnblockedEmailUseCase(emailService),
      accountTrusted: new SendAccountTrustedEmailUseCase(emailService),
      accountUntrusted: new SendAccountUntrustedEmailUseCase(emailService),
      gotAppointment: new SendGotAppointmentEmailUseCase(emailService),
      confirmAppointment: new SendConfirmAppointmentEmailUseCase(emailService),
      rejectAppointment: new SendRejectAppointmentEmailUseCase(emailService),
      userPayment: new SendUserPaymentEmailUseCase(emailService),
      providerSubscriptionPayment:
        new SendProviderSubscriptionPaymentEmailUseCase(emailService),
      providerPayout: new SendProviderPayoutEmailUseCase(emailService),
      providerStripeAccount:
        new SendProviderStripeAccountEmailUseCase(emailService),
      userGoogleConnect: new SendGoogleConnectEmailUseCase(emailService),
      providerGoogleConnect: new SendGoogleConnectEmailUseCase(emailService),
    };

    for (const [key, topic] of Object.entries(kafkaConfig.topics)) {
      const useCase = handlers[key as keyof typeof handlers];
      if (!useCase) continue;

      await this.kafkaClient.subscribe(topic, async ({ message }) => {
        if (!message.value) return;
        const payload = JSON.parse(message.value.toString());
        await useCase.handle(payload);
      });
    };

    await this.kafkaClient.startConsumer();
  };

}
;