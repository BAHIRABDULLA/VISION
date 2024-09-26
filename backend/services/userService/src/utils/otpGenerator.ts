import nodemailer from 'nodemailer'
import otpGenerator from 'otp-generator'


export const generateOtp = () => {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
}

export const sentOTPEmail = async(email:string,otp:string)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.NODEMAILER_EMAIL,
            pass:process.env.NODEMAILER_PASSKEY
        }
    });
    const mailOption = {
        from:process.env.NODEMAILER_EMAIL,
        to:email,
        subject:'Your OTP code',
        text:`Your otp code is ${otp}`
    }
    await transporter.sendMail(mailOption)
}