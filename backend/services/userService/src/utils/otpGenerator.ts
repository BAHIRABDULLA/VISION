import nodemailer from 'nodemailer'
import otpGenerator from 'otp-generator'


export const generateOtp = () => {
    // const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
    const otp = Math.floor(100000+Math.random()*900000).toString()
    console.log(otp,'otp in otp generator ');
    
    return otp
}


// console.log(process.env.NODEMAILER_EMAIL,'PROCRESS ENV NODEMAILER');
// console.log(process.env.NODEMAILER_PASSKEY,'PROCESS ENV PASSKEY');

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
        subject:'VISION otp verification',
        text:`Your OTP code is ${otp}`
    }
    try {
        
        const sentMail =await transporter.sendMail(mailOption)
        console.log(sentMail,'sentEmail');
        
    } catch (error) {
        console.error('Error sending email',error);
        throw new Error('Email sending failed')
    }
}