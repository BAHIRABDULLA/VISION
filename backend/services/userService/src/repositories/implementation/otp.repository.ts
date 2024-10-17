import Otp from "../../models/otp.model"

export class OtpRepository {
    async storeOtp (email: string, otp: string)  {
        try {
            console.log('&&&&&&   its here store otp');

            const otpRecord = new Otp({
                email,
                otp
            })
            return await otpRecord.save()

        } catch (error) {
            console.error('Error storing OTP:', error);

        }

    }
    async findOtpByEmail  (email: string)  {
        const otpRecord = await Otp.findOne({ email })
        
        return otpRecord
    }

    async deleteOtp  (email: string)  {
        await Otp.deleteOne({ email })
    }
}