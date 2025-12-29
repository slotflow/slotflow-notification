import nodemailer from 'nodemailer';
import { ses } from '../lib/aws.ses';
import { mailConfig } from '../../config/env';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { EmailOptions } from '../../application/dtos/common';
import { IEmailService } from '../../application/service/IEmail.service';

export class EmailService implements IEmailService {

  async sendEmailViaNodemailer(options: EmailOptions): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: mailConfig.officialMail,
          pass: mailConfig.officialMailPassword,
        },
      });

      await transporter.sendMail({
        from: "Slotflow",
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      console.log("Error : ", error)
      throw new Error("Failed to send OTP.");
    }
  }


  async sendEmailViaSes(options: EmailOptions): Promise<void> {
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
