import nodemailer from 'nodemailer'


export const sentOTPEmail = async (email: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSKEY
        }
    });
    const mailOption = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: 'VISION otp verification',
        text: `Your OTP code is ${otp}`
    }
    try {

        const sentMail = await transporter.sendMail(mailOption)
        console.log(sentMail, 'sentEmail');

    } catch (error) {
        console.error('Error sending email', error);
        throw new Error('Email sending failed')
    }
}