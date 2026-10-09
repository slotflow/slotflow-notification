import { IntegrationStatus } from "../enums/enum";
import { CredentialProps } from "../contracts/credential.contract";
import {
  CreateCredentialProps,
  GoogleCredentials,
  NotionCredentials,
  UpdateCredentialProps,
  WhatsAppCredentials,
} from "../commands/credential.commands";

export class Credential {
  private props: CredentialProps;

  constructor(props: CredentialProps) {
    this.props = props;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: CreateCredentialProps): Credential {
    const now = new Date();
    return new Credential({
      _id: "",
      userId: props.userId,
      google: null,
      whatsApp: null,
      notion: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Getters
  get _id(): string {
    return this.props._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get google(): GoogleCredentials | null {
    return this.props.google;
  }

  get whatsApp(): WhatsAppCredentials | null {
    return this.props.whatsApp;
  }

  get notion(): NotionCredentials | null {
    return this.props.notion;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business Methods

  getProps(): Readonly<CredentialProps> {
    return { ...this.props };
  }

  updateCredential(props: UpdateCredentialProps) {
    this.props = {
      ...this.props,
      ...props,
    };

    this.touch();
  }

  updateGoogleCredentials(credentials: Omit<GoogleCredentials, "connectedAt" | "status">): void {
    if (!credentials.accessToken) {
      throw new Error("Access token is required to update Google credentials.");
    }

    const now = new Date();
    this.props.google = {
      ...credentials,
      connectedAt: this.props.google?.connectedAt || now,
      status: IntegrationStatus.CONNECTED,
      lastSyncedAt: now,
    };
    this.touch();
  }

  disconnectGoogle(): void {
    if (this.props.google) {
      this.props.google.status = IntegrationStatus.DISCONNECTED;
      this.touch();
    }
  }

  isGoogleTokenExpired(bufferSeconds: number = 60): boolean {
    if (!this.props.google || !this.props.google.expiryDate) return true;
    const bufferMs = bufferSeconds * 1000;
    return new Date().getTime() >= new Date(this.props.google.expiryDate).getTime() - bufferMs;
  }

  updateWhatsAppCredentials(
    credentials: Omit<WhatsAppCredentials, "connectedAt" | "status">,
  ): void {
    if (!credentials.accessToken) {
      throw new Error("Access token is required to update WhatsApp credentials.");
    }

    const now = new Date();
    this.props.whatsApp = {
      ...credentials,
      connectedAt: this.props.whatsApp?.connectedAt || now,
      status: IntegrationStatus.CONNECTED,
      lastSyncedAt: now,
    };
    this.touch();
  }

  disconnectWhatsApp(): void {
    if (this.props.whatsApp) {
      this.props.whatsApp.status = IntegrationStatus.DISCONNECTED;
      this.touch();
    }
  }

  isWhatsAppTokenExpired(bufferSeconds: number = 60): boolean {
    if (!this.props.whatsApp) return true;
    if (!this.props.whatsApp.tokenExpiryDate) return false;
    const bufferMs = bufferSeconds * 1000;
    return (
      new Date().getTime() >= new Date(this.props.whatsApp.tokenExpiryDate).getTime() - bufferMs
    );
  }

  updateNotionCredentials(credentials: Omit<NotionCredentials, "connectedAt" | "status">): void {
    if (!credentials.accessToken) {
      throw new Error("Access token is required to update Notion credentials.");
    }

    const now = new Date();
    this.props.notion = {
      ...credentials,
      connectedAt: this.props.notion?.connectedAt || now,
      status: IntegrationStatus.CONNECTED,
      lastSyncedAt: now,
    };
    this.touch();
  }

  disconnectNotion(): void {
    if (this.props.notion) {
      this.props.notion.status = IntegrationStatus.DISCONNECTED;
      this.touch();
    }
  }

  isNotionTokenExpired(): boolean {
    if (!this.props.notion) return true;
    return false;
  }
}
