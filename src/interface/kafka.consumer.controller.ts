import { kafkaConfig } from "../config/env";
import { EmailService } from "../infrastructure/services/email.service";
import { kafkaConsumerService } from "../infrastructure/lib/kafka.consumer";
import { ListenOtpEventUseCase } from "../application/otpEmailSend.use-case";

const emailService = new EmailService();
const listenOtpEventUseCase = new ListenOtpEventUseCase(kafkaConsumerService, emailService, kafkaConfig.otpSendTopic );

class KafkaConsumerController {
  constructor(
    private listenOtpEventUseCase: ListenOtpEventUseCase
) {}

  async startListening() {
    await this.listenOtpEventUseCase.execute();
  }
}

const kafkaConsumerController = new KafkaConsumerController(listenOtpEventUseCase)
