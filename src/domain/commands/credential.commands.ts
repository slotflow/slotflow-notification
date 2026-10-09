import { IntegrationStatus } from "../enums/enum";
import { CredentialProps } from "../contracts/credential.contract";

export interface BaseCredentialDetails {
  connectedAt: Date;
  status: IntegrationStatus;
  lastSyncedAt?: Date | null;
}

export interface GoogleCredentials extends BaseCredentialDetails {
  googleId: string;
  accessToken: string;
  refreshToken: string;
  expiryDate: Date;
}

export interface WhatsAppCredentials extends BaseCredentialDetails {
  phoneAccountId: string;
  wabaId: string;
  accessToken: string;
  tokenExpiryDate?: Date | null;
}

export interface NotionCredentials extends BaseCredentialDetails {
  workspaceId: string;
  botId: string;
  accessToken: string;
  workspaceName?: string | null;
  workspaceIcon?: string | null;
}

export type CreateCredentialProps = Pick<CredentialProps, "userId">;

export type UpdateCredentialProps = Partial<
  Omit<CredentialProps, "_id" | "userId" | "createdAt" | "updatedAt">
>;
