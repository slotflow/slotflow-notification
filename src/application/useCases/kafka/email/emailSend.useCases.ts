import { log } from "../../../../shared/logger/logger";
import { EmailEventPayload } from "../../../dtos/email.dtos";
import { AppError } from "../../../../shared/error/appError";
import { emailTemplate } from "../../../../shared/utils/constants/emailConstants";
import { IEmailService } from "../../../../domain/interfaces/services/IEmail.service";
import { emailTemplateRegistry } from "../../../../shared/utils/constants/emailTemplates";

export class SendEmailUseCase {
  constructor(
    private readonly emailService: IEmailService
  ) {}

  async execute(input: EmailEventPayload): Promise<void> {
    try {
      const { email, name, templateKey, ...payloadData } = input;

      const template = emailTemplateRegistry[templateKey] as typeof emailTemplateRegistry[typeof templateKey];

      if (!template) {
        throw new AppError(`Template not found for key: ${templateKey}`, 400);
      }

      const subject = template.subject(payloadData as never);
      const innerContent = template.renderBody(payloadData as never);
      const fullHtml = emailTemplate.html(subject, name, innerContent);

      await this.emailService.sendEmailViaNodemailer({
        to: email,
        subject,
        html: fullHtml,
      });
    } catch (error) {
      log.error(`SendEmailUseCase [${input.templateKey}] failed:`, error as Error);
      throw error;
    }
  }
}