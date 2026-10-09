export interface CommonChannelPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  sms: boolean;
}

export interface NotificationPreferenceProps {
  _id: string;
  userId: string;
  accountActivity: CommonChannelPreferences;
  systemUpdates: CommonChannelPreferences;
  promotionalUpdates: CommonChannelPreferences;
  createdAt: Date;
  updatedDate: Date;
}
