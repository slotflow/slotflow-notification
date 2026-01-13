import { NotificationProps } from "../contracts/notification.contract";
import { CreateNotificationProps } from "../commands/notification.commands";

export class Notification {
    private props: NotificationProps;

    constructor(props: NotificationProps) {
        this.props = props;
    };

    private touch() {
        this.props.updatedAt = new Date();
    };

    static create(props: CreateNotificationProps): Notification {
        return new Notification({
            _id: "",
            userId: props.userId,
            message: props.message,
            pushNotification: props.pushNotification,
            isRead: props.isRead,
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

    get message(): string {
        return this.props.message;
    };

    get pushNotification(): boolean {
        return this.props.pushNotification;
    };

    get isRead(): boolean {
        return this.props.isRead;
    };

    get createdAt(): Date {
        return this.props.createdAt;
    };

    get updatedAt(): Date {
        return this.props.updatedAt;
    };

    // Business Methods

    getProps(): Readonly<NotificationProps> {
        return { ...this.props };
    };

    markAsRead(): void {
        if (this.props.isRead) return;

        this.props.isRead = true;
        this.touch();
    };

};