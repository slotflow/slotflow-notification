import mongoose, { Schema, Types } from "mongoose";
import { Platform } from "../../domain/enums/enum";

export interface IUserDevice {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    fcmToken: string;
    platform: Platform;
    deviceId: string;
    isActive: boolean;
    lastUsedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userDeviceSchema = new Schema<IUserDevice>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    fcmToken: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        enum: Object.values(Platform),
        required: true
    },
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastUsedAt: {
        type: Date,
        default: Date.now
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

export const UserDeviceModel = mongoose.model<IUserDevice>("UserDevice", userDeviceSchema);
