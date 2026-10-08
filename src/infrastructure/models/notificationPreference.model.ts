import mongoose, { Schema, Types } from "mongoose";
import { CommonChannelPreferences } from "../../domain/contracts/notificationPreference.contract";

export interface INotificationPreference {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    accountActivity: CommonChannelPreferences;
    systemUpdates: CommonChannelPreferences;
    promotionalUpdates: CommonChannelPreferences;
    createdAt: Date;
    updatedDate: Date;
};

const commonChannelPreferencesSchema = new Schema<CommonChannelPreferences>({
    email: {
        type: Boolean,
        default: true,
    },
    push: {
        type: Boolean,
        default: true,
    },
    inApp: {
        type: Boolean,
        default: true,
    },
    sms: {
        type: Boolean,
        default: true,
    },
}, {
    _id: false,
});

const notificationPreferenceSchema = new Schema<INotificationPreference>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required"],
        unique: true,
        index: true,
    },
    accountActivity: {
        type: commonChannelPreferencesSchema,
        default: () => ({}),
    },
    systemUpdates: {
        type: commonChannelPreferencesSchema,
        default: () => ({}),
    },
    promotionalUpdates: {
        type: commonChannelPreferencesSchema,
        default: () => ({}),
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedDate",
    },
});

export const NotificationPreferenceModel = mongoose.model<INotificationPreference>(
    "NotificationPreference",
    notificationPreferenceSchema,
);
