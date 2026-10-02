import { EmailOptions } from "../../dtos/email.dto";

export interface IEmailService {

    sendEmailViaNodemailer(options: EmailOptions): Promise<void>;

    sendEmailViaSes(options: EmailOptions): Promise<void>;

};