import { EmailService } from "../infrastructure/services/email.service";
import { emailMainTemplate, otpEmailTemplate } from "../utils/constants";
import { KafkaConsumerService } from "../infrastructure/lib/kafka.consumer";

export class ListenOtpEventUseCase {
    constructor(
        private kafkaConsumer: KafkaConsumerService,
        private emailService: EmailService,
        private topic: string,
    ) { }

    async execute() {

        await this.kafkaConsumer.subscribe(this.topic, async ({ message }) => {
            if (!message.value) return;
            try {
                const { email, otp } = JSON.parse(message.value.toString());

                const htmlContent = `${otpEmailTemplate.contentStart}${otp}${otpEmailTemplate.contentEnd}`;

                await this.emailService.sendEmail({
                    to: email,
                    subject: otpEmailTemplate.subject,
                    html: emailMainTemplate.html(otpEmailTemplate.subject, htmlContent),
                });

            } catch (error) {
                console.error("❌ Error handling OTP event:", error);
            }
        });
    }
}
