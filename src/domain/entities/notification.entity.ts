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
            title: props.title,
            body: props.body,
            pushNotification: props.pushNotification ?? false,
            data: props.data ?? null,
            isRead: false,
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

    get title(): string {
        return this.props.title;
    };

    get body(): string {
        return this.props.body;
    };

    get pushNotification(): boolean {
        return this.props.pushNotification;
    };

    get isRead(): boolean {
        return this.props.isRead;
    };

    get data(): Record<string, string> {
        if(this.props.data) {
            return this.props.data;
        } else {
            return {};
        }
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