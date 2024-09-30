import Otp from "../models/otpModel"

export const otpRepository = {
    storeOtp: async (email: string, otp: string) => {
        try {
            console.log('&&&&&&   its here store otp');

            const otpRecord = new Otp({
                email,
                otp,
                createdAt: new Date(),
                expiredAt: new Date(Date.now() + 30 * 1000)
            })
           return await otpRecord.save()
            
        } catch (error) {
            console.error('Error storing OTP:',error);
            
        }

    },
    findOtpByEmail: async (email: string) => {
        const otpRecord = await Otp.findOne({email})
        if(otpRecord && otpRecord.expiredAt.getTime() < Date.now()){
            await otpRepository.deleteOtp(email)
            return null
        }
        return await Otp.findOne({ email })
    },

    deleteOtp: async (email: string) => {
        await Otp.deleteOne({ email })
    }
}