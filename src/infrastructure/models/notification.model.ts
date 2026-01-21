import mongoose, { Schema, Types } from "mongoose";
import { NotificationType } from "../../domain/enums/enum";

export interface INotification {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    title: string;
    body: string;
    pushNotification: boolean;
    isRead: boolean;
    data: Record<string, string>;
    createdAt: Date,
    updatedAt: Date,
};

const notificationDataSchema = new Schema<Record<string, string>>({
    notificationType: {
        type: String,
        enum: Object.values(NotificationType),
        required: [true, "Notification type is required"],
    },
    providerId: {
        type: String,
        required: [true, "Provider ID is required"],
    },
    redirectUrl: {
        type: String,
    },
})

const notificationSchema = new Schema<INotification>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
    body: {
        type: String,
        required: [true, "Notification body is required"],
        maxLength: [500, "Notification body cannot exceed 500 characters"],
        minLength: [1, "Notification body cannot be empty"],
        trim: true
    },
    title: {
        type: String,
        required: [true, "Notification title is required"],
        maxLength: [200, "Notification title cannot exceed 500 characters"],
        minLength: [1, "Notification title cannot be empty"],
        trim: true
    },
    pushNotification: {
        type: Boolean,
        default: false,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    data: notificationDataSchema,
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});


export const NotificationModel = mongoose.model<INotification>('Notification', notificationSchema);
