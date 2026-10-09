import { IntegrationStatus } from "../../domain/enums/enum";
import mongoose, { Document, Schema, Types, model } from "mongoose";
import {
  GoogleCredentials,
  NotionCredentials,
  WhatsAppCredentials,
} from "../../domain/commands/credential.commands";

export interface ICredential extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  google: GoogleCredentials | null;
  whatsApp: WhatsAppCredentials | null;
  notion: NotionCredentials | null;
  createdAt: Date;
  updatedAt: Date;
}

const GoogleCredentialsSchema = new Schema<GoogleCredentials>(
  {
    googleId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    connectedAt: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      enum: Object.values(IntegrationStatus),
      required: true,
      default: IntegrationStatus.CONNECTED,
    },
    lastSyncedAt: { type: Date, default: null },
  },
  { _id: false },
);

const WhatsAppCredentialsSchema = new Schema<WhatsAppCredentials>(
  {
    phoneAccountId: { type: String, required: true },
    wabaId: { type: String, required: true },
    accessToken: { type: String, required: true },
    tokenExpiryDate: { type: Date, default: null },
    connectedAt: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      enum: Object.values(IntegrationStatus),
      required: true,
      default: IntegrationStatus.CONNECTED,
    },
    lastSyncedAt: { type: Date, default: null },
  },
  { _id: false },
);

const NotionCredentialsSchema = new Schema<NotionCredentials>(
  {
    workspaceId: { type: String, required: true },
    botId: { type: String, required: true },
    accessToken: { type: String, required: true },
    workspaceName: { type: String, default: null },
    workspaceIcon: { type: String, default: null },
    connectedAt: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      enum: Object.values(IntegrationStatus),
      required: true,
      default: IntegrationStatus.CONNECTED,
    },
    lastSyncedAt: { type: Date, default: null },
  },
  { _id: false },
);

const CredentialSchema = new Schema<ICredential>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    google: {
      type: GoogleCredentialsSchema,
      default: null,
    },
    whatsApp: {
      type: WhatsAppCredentialsSchema,
      default: null,
    },
    notion: {
      type: NotionCredentialsSchema,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const CredentialModel = model<ICredential>("Credential", CredentialSchema);
