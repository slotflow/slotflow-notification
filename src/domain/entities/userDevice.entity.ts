import { Platform } from "../enums/enum";
import { UserDeviceProps } from "../contracts/userDevice.contract";
import { CreateUserDeviceProps } from "../commands/userDevice.commands";

export class UserDevice {
  private props: UserDeviceProps;

  constructor(props: UserDeviceProps) {
    this.props = props;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  static create(props: CreateUserDeviceProps): UserDevice {
    const now = new Date();

    return new UserDevice({
      _id: "",
      userId: props.userId,
      fcmToken: props.fcmToken,
      platform: props.platform,
      deviceId: props.deviceId,
      isActive: true,
      lastUsedAt: now,
      createdAt: now,
      updatedAt: now,
    });
  }

  get _id(): string {
    return this.props._id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get fcmToken(): string {
    return this.props.fcmToken;
  }

  get platform(): Platform {
    return this.props.platform;
  }

  get deviceId(): string {
    return this.props.deviceId;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get lastUsedAt(): Date {
    return this.props.lastUsedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateToken(newToken: string): void {
    if (this.props.fcmToken !== newToken) {
      this.props.fcmToken = newToken;
      this.touch();
    }
  }

  activate(): void {
    if (!this.props.isActive) {
      this.props.isActive = true;
      this.touch();
    }
  }

  deactivate(): void {
    if (this.props.isActive) {
      this.props.isActive = false;
      this.touch();
    }
  }

  markUsed(): void {
    this.props.lastUsedAt = new Date();
    this.touch();
  }

  getProps(): Readonly<UserDeviceProps> {
    return { ...this.props };
  }
}
