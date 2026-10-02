import { GoogleCredentials, NotionCredentials, WhatsAppCredentials } from "../commands/credential.commands";

export interface CredentialProps {
    _id: string,
    userId: string,
    google: GoogleCredentials | null,
    whatsApp: WhatsAppCredentials | null;
    notion: NotionCredentials | null;
    createdAt: Date,
    updatedAt: Date,
}