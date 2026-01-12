import nodemailer from 'nodemailer';
import { ses } from '../lib/aws.ses';
import { log } from '../../shared/logger/logger';
import { officialConfig } from '../../config/env';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { emailServiceConstants } from '../../shared/utils/constants';
import { EmailOptions } from '../../application/dtos/common.dtos';
import { IEmailService } from '../../application/service/IEmail.service';

export class EmailServiceImpl implements IEmailService {

  async sendEmailViaNodemailer(options: EmailOptions): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: emailServiceConstants.gmail,
        auth: {
          user: officialConfig.email,
          pass: officialConfig.password,
        },
      });

      await transporter.sendMail({
        from: emailServiceConstants.slotflow,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      log.error("sendEmailViaNodemailer failed : ", error as Error);
      throw error;
    };
  };


  async sendEmailViaSes(options: EmailOptions): Promise<void> {
    try {
      const params = {
        Source: emailServiceConstants.source,
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
      await ses.send(command);

    } catch (error) {
      log.error("sendEmailViaSes failed : ", error as Error);
      throw error;
    };
  };

};
