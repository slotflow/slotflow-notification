import z from "zod";

// connect google calendar callback controller zod schema
export const connectGoogleCalendarSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    googleId: z.string().min(1, "Google ID is required"),
    googleAccessToken: z.string().min(1, "Google Access Token is required"),
    googleRefreshToken: z.string().min(1, "Google Refresh Token is required"),
    expiryDate: z.coerce.date({
        required_error: "Expiry date is required",
        invalid_type_error: "Expiry date must be a valid Date object",
    }),
});