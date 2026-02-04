import { Platform } from "../enums/enum";
import { UserDeviceProps } from "../contracts/userDevice.contract";
import { CreateUserDeviceProps } from "../commands/userDevice.commands";

export class UserDevice {
    private props: UserDeviceProps;

    constructor(props: UserDeviceProps) {
        this.props = props;
    };

    private touch() {
        this.props.updatedAt = new Date();
    };

    static create(props: CreateUserDeviceProps): UserDevice {
        return new UserDevice({
            _id: "",
            userId: props.userId,
            fcmToken: props.fcmToken,
            platform: props.platform,
            deviceId: props.deviceId,
            isActive: true,
            lastUsedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    };

    // Getters

    get _id(): string {
        return this.props._id;
    };

    get userId(): string {
        return this.props.userId;
    };

    get fcmToken(): string {
        return this.props.fcmToken;
    };

    get platform(): Platform {
        return this.props.platform;
    };

    get deviceId(): string {
        return this.props.deviceId;
    };

    get isActive(): boolean {
        return this.props.isActive;
    };

    get lastUsedAt(): Date {
        return this.props.lastUsedAt;
    };

    get createdAt(): Date {
        return this.props.createdAt;
    };

    get updatedAt(): Date {
        return this.props.updatedAt;
    };

    // Business Methods

    updateToken(newToken: string) {
        if (this.props.fcmToken !== newToken) {
            this.props.fcmToken = newToken;
            this.touch();
        };
    };

    deactivate() {
        this.props.isActive = false;
        this.touch();
    };

    markUsed() {
        this.props.lastUsedAt = new Date();
        this.touch();
    };

    getProps(): Readonly<UserDeviceProps> {
        return { ...this.props };
    };

};
