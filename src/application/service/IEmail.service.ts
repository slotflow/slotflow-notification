import { EmailOptions } from "../dtos/common.dtos";

export interface IEmailService {

    sendEmailViaNodemailer(options: EmailOptions): Promise<void>;

    sendEmailViaSes(options: EmailOptions): Promise<void>;

};