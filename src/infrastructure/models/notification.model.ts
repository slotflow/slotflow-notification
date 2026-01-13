import mongoose, { Schema, Types } from "mongoose";

export interface INotification {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    message: string;
    pushNotification: boolean;
    isRead: boolean;
    createdAt: Date,
    updatedAt: Date,
};

const notificationSchema = new Schema<INotification>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required"],
    },
    message: {
        type: String,
        required: [true, "Notification message is required"],
        maxLength: [500, "Notification message cannot exceed 500 characters"],
        minLength: [1, "Notification message cannot be empty"],
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
