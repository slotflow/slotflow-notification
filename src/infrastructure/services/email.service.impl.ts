import nodemailer from 'nodemailer';
import { log } from '../../shared/logger/logger';
import { officialConfig } from '../../config/env';
import { ses } from '../cloud/aws/aws.ses.client';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { AppError } from '../../shared/error/appError';
import { ERROR_CODES } from '../../shared/utils/types';
import { EmailOptions } from '../../application/dtos/common.dtos';
import { emailServiceConstants } from '../../shared/utils/constants';
import { IEmailService } from '../../domain/interfaces/services/IEmail.service';

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

      throw new AppError(
        "Failed to send email",
        500,
        false,
        ERROR_CODES.EMAIL_SERVICE_ERROR
      )
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
      
      throw new AppError(
        "Failed to send email",
        500,
        false,
        ERROR_CODES.EMAIL_SERVICE_ERROR
      )
    };
  };

};
