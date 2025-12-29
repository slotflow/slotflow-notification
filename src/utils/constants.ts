export const emailMainTemplate = {
  html: (subject: string, contentHTML: string) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
</head>
<body style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
    <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
        <div style="border-bottom: 1px solid #eee;">
            <a href="#" style="font-size: 1.4em; color: #635BFF; text-decoration: none; font-weight: 600;">Slotflow</a>
        </div>
        ${contentHTML}
        <p style="font-size: 0.9em;">Regards,<br />Slotflow</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
            <p>Slotflow Inc</p>
            <p>Sylicon Valley</p>
            <p>California</p>
            <p>USA</p>
        </div>
    </div>
</body>
</html>`,
};

export const otpEmailTemplate: Record<string, string> = {
    subject: "Your OTP for verifying Slotflow registration",
    contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Use the following OTP to complete your sign-up process. OTP is valid for 5 minutes.</p>
<h2 style="background: #635BFF; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">`,
    contentEnd: `</h2>`,
};

export const welcomeEmailTemplate: Record<string, string> = {
  subject: "Welcome to Slotflow!",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>We're thrilled to have you onboard. Your Slotflow journey begins now!</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>We hope you enjoy the experience.</p>`,
};

export const adminApprovedEmailTemplate: Record<string, string> = {
  subject: "Your account has been approved by admin",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Good news! Your account has been approved by our admin team.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>You can now access all features of Slotflow.</p>`,
};

export const adminRejectedEmailTemplate: Record<string, string> = {
  subject: "Your account approval was rejected",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Unfortunately, your account approval was rejected by our admin team.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>Please contact support for further assistance.</p>`,
};

export const accountBlockedEmailTemplate: Record<string, string> = {
  subject: "Your account has been blocked",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Your Slotflow account has been temporarily blocked.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>Please contact support if you think this is a mistake.</p>`,
};

export const accountUnblockedEmailTemplate: Record<string, string> = {
  subject: "Your account has been unblocked",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Good news! Your Slotflow account has been unblocked and is now active.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>You can continue using all Slotflow features.</p>`,
};

export const accountTrustedEmailTemplate: Record<string, string> = {
  subject: "Your account is now Trusted on Slotflow",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Congratulations! Your service provider account has been marked as <strong>Trusted</strong> on Slotflow.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>This status helps your clients trust your services more. Keep up the great work!</p>`,
};

export const accountUntrustedEmailTemplate: Record<string, string> = {
  subject: "Your account is no longer Trusted on Slotflow",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>We wanted to inform you that your service provider account has been marked as <strong>Untrusted</strong> on Slotflow.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>Please review your account and contact support if you believe this is a mistake.</p>`,
};

export const gotAppointmentEmailTemplate: Record<string, string> = {
  subject: "You have a new appointment",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>You have received a new appointment request from a user.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>Please check your dashboard to view the appointment details and respond accordingly.</p>`,
};

export const confirmAppointmentEmailTemplate: Record<string, string> = {
  subject: "Your appointment has been confirmed",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Good news! Your appointment with the service provider has been confirmed.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>You can view your appointment details in your Slotflow dashboard.</p>`,
};

export const rejectAppointmentEmailTemplate: Record<string, string> = {
  subject: "Your appointment has been rejected",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>We’re sorry to inform you that your appointment request has been rejected by the service provider.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>Please try booking another slot or contact the service provider for more information.</p>`,
};

export const userPaymentEmailTemplate: Record<string, string> = {
  subject: "Your payment was successful",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Thank you for your payment for the appointment. Your booking is now confirmed.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>You can view your appointment details in your Slotflow dashboard.</p>`,
};

export const providerSubscriptionPaymentEmailTemplate: Record<string, string> = {
  subject: "Subscription payment successful",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Your subscription payment for your Slotflow account has been successfully processed.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>Thank you for staying with Slotflow. Your account remains active.</p>`,
};

export const providerPayoutEmailTemplate: Record<string, string> = {
  subject: "Payout processed successfully",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Your payout from Slotflow has been successfully transferred to your bank account.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>Please check your bank account for the credited amount.</p>`,
};

export const providerStripeAccountEmailTemplate: Record<string, string> = {
  subject: "Your Stripe account has been successfully created",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Congratulations! Your Stripe account has been successfully linked to your Slotflow provider account.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>You can now receive payments directly through Slotflow.</p>`,
};

export const googleConnectEmailTemplate: Record<string, string> = {
  subject: "Google account connected successfully",
  contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Your Google account has been successfully connected to your Slotflow account.</p>
<div style="background: #635BFF; color: #fff; padding: 10px 20px; border-radius: 4px; width: max-content; margin: 10px 0;">`,
  contentEnd: `</div>
<p>You can now sign in quickly and securely using your Google account.</p>`,
};
