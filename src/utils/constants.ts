export const otpEmailTemplate: Record<string, string> = {
    subject: "Your OTP for verifying Slotflow registration",
    contentStart: `<p style="font-size: 1.1em;">Hi,</p>
<p>Use the following OTP to complete your sign-up process. OTP is valid for 5 minutes.</p>
<h2 style="background: #635BFF; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">`,
    contentEnd: `</h2>`,
};

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
            <p>White clouds</p>
            <p>Somewhere in the universe</p>
        </div>
    </div>
</body>
</html>`,
};
