import { ses } from '../lib/aws.ses';
import { SendEmailCommand } from '@aws-sdk/client-ses';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export class EmailService {

    async sendEmail(options: EmailOptions): Promise<void> {
        try {
            const params = {
                Source: "no-reply@slotflow.online",
                Destination: {
                    ToAddresses: [options.to],
                },
                Message: {
                    Subject: { Data: options.subject },
                    Body: {
                        Html: { Data: options.html },
                    },
                },
            };

            const command = new SendEmailCommand(params);
            const response = await ses.send(command);

            console.log(`✅ Email sent to ${options.to}: ${response.MessageId}`);
        } catch (error) {
            console.error("❌ Error sending email via SES:", error);
            throw error;
        }
    }
}
