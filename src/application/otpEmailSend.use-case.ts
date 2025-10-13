import { EmailService } from "../infrastructure/services/email.service";
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

                await this.emailService.sendEmail({
                    to: email,
                    subject: "Your OTP Code for registering in Slotflow",
                    html: EmailService.getEmailTemplate(
                        'Your OTP Code',
                        `
      <p style="font-size: 1.1em;">Hi,</p>
      <p>Use the following OTP to complete your sign-up process. OTP is valid for 5 minutes.</p>
      <h2 style="background: #635BFF; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">${otp}</h2>
    `
                    ),
                })

                console.log(`✅ OTP sent to ${email}`);
            } catch (error) {
                console.error("❌ Error handling OTP event:", error);
            }
        });
    }
}
