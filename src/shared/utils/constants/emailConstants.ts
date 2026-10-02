
// email template mapper
export const emailTemplateConstants = {
    sendOtp: 'sendOtp',
    registerSuccess: 'registerSuccess',
    passwordReset: 'passwordReset',
    adminProviderReview: 'adminProviderReview',
    accountBlockStatus: 'accountBlockStatus',
    accountTrustStatus: 'accountTrustStatus',
    providerAppointmentStatusForUser: 'providerAppointmentStatusForUser',
    appConnect: 'appConnect',
    providerSubscriptionPaymentSuccess: 'providerSubscriptionPaymentSuccess',
    userBookingPaymentSuccess: 'userBookingPaymentSuccess',
    planSubscribed: 'planSubscribed',
    slotBooked: 'slotBooked',
    gotAnAppointment: 'gotAnAppointment',
    userBookingRefundPaymentSuccess: "userBookingRefundPaymentSuccess",
} as const;

// email template
export const emailTemplate = {
    html: (subject: string, name: string, contentHTML: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F9FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; word-spacing: normal;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 12px; border: 1px solid #E9ECEF; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); border-spacing: 0;">
            <!-- Header -->
            <tr>
                <td style="padding: 32px 40px 24px 40px; border-bottom: 1px solid #F1F3F5;">
                    <a href="#" style="font-size: 22px; color: #635BFF; text-decoration: none; font-weight: 700; letter-spacing: -0.5px; display: inline-block;">
                        Slotflow
                    </a>
                </td>
            </tr>

            <!-- Body Content -->
            <tr>
                <td style="padding: 32px 40px; color: #212529; font-size: 15px; line-height: 1.6;">
                    <p style="font-size: 1.1em; margin-top: 0; margin-bottom: 16px; font-weight: 600; color: #212529;">
                        Hi, ${name},
                    </p>

                    ${contentHTML}
                    
                    <div style="margin-top: 32px; padding-top: 16px; color: #495057; font-size: 14px;">
                        Regards,<br />
                        <strong style="color: #212529;">The Slotflow Team</strong>
                    </div>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="padding: 24px 40px 32px 40px; background-color: #FAFAFA; border-top: 1px solid #F1F3F5; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 6px 0; color: #868E96; font-size: 12px; font-weight: 500;">
                        Slotflow Inc. &bull; Silicon Valley, California, USA
                    </p>
                    <p style="margin: 0; color: #ADB5BD; font-size: 11px;">
                        &copy; ${new Date().getFullYear()} Slotflow. All rights reserved.
                    </p>
                </td>
            </tr>
        </table>
</body>
</html>`,
};