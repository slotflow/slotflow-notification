import { NotificationPreferenceProps, CommonChannelPreferences } from "../contracts/notificationPreference.contract";
import { CreateNotificationPreferenceProps } from "../commands/notificationPreference.commands";

export class NotificationPreference {
    private props: NotificationPreferenceProps;

    constructor(props: NotificationPreferenceProps) {
        this.props = props;
    };

    private touch() {
        this.props.updatedDate = new Date();
    };

    static create(props: CreateNotificationPreferenceProps): NotificationPreference {
        const now = new Date();
        const defaultPreferences: CommonChannelPreferences = {
            email: true,
            push: true,
            inApp: true,
            sms: true,
        };

        return new NotificationPreference({
            _id: "",
            userId: props.userId,
            accountActivity: { ...defaultPreferences },
            systemUpdates: { ...defaultPreferences },
            promotionalUpdates: { ...defaultPreferences },
            createdAt: now,
            updatedDate: now,
        });
    };

    get _id(): string {
        return this.props._id;
    };

    get userId(): string {
        return this.props.userId;
    };

    get accountActivity(): CommonChannelPreferences {
        return { ...this.props.accountActivity };
    };

    get systemUpdates(): CommonChannelPreferences {
        return { ...this.props.systemUpdates };
    };

    get promotionalUpdates(): CommonChannelPreferences {
        return { ...this.props.promotionalUpdates };
    };

    get createdAt(): Date {
        return this.props.createdAt;
    };

    get updatedDate(): Date {
        return this.props.updatedDate;
    };

    getProps(): Readonly<NotificationPreferenceProps> {
        return {
            ...this.props
        };
    };

    updateAccountActivity(preferences: CommonChannelPreferences): void {
        this.props.accountActivity = { ...preferences };
        this.touch();
    };

    updateSystemUpdates(preferences: CommonChannelPreferences): void {
        this.props.systemUpdates = { ...preferences };
        this.touch();
    };

    updatePromotionalUpdates(preferences: CommonChannelPreferences): void {
        this.props.promotionalUpdates = { ...preferences };
        this.touch();
    };

};
