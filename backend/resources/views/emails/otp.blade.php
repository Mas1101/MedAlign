<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>MedAlign OTP Verification</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 40px 20px; }
        .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .logo { font-size: 24px; font-weight: 800; color: #1d4ed8; letter-spacing: -0.5px; margin-bottom: 20px; }
        .header { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
        .text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
        .otp-box { background: #f0f9ff; border: 1px border-blue-200; border-radius: 16px; padding: 24px; text-align: center; margin: 30px 0; }
        .otp-code { font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #1e40af; margin: 0; }
        .expiry { font-size: 12px; color: #64748b; margin-top: 10px; }
        .footer { font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">MedAlign Security</div>
        <div class="header">Hello, {{ $name }}!</div>
        <div class="text">
            You requested a {{ $type }} One-Time Password (OTP) for your MedAlign healthcare account. Please use the verification code below:
        </div>

        <div class="otp-box">
            <div class="otp-code">{{ $otpCode }}</div>
            <div class="expiry">This code will expire in 10 minutes.</div>
        </div>

        <div class="text">
            If you did not request this code, please ignore this email or contact clinic security immediately.
        </div>

        <div class="footer">
            &copy; 2026 MedAlign Healthcare Systems. All rights reserved.
        </div>
    </div>
</body>
</html>
