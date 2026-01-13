import admin from "firebase-admin";
import { firebaseConfig } from "../../config/env";

const serviceAccount = JSON.parse(firebaseConfig.firebaseServiceAccountJson);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
};

export const firebaseAdmin = admin;
export const firebaseMessaging = admin.messaging();
