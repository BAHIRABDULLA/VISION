import Otp from "../../models/otpModel"

export const otpRepository = {
    storeOtp: async (email: string, otp: string) => {
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

    },
    findOtpByEmail: async (email: string) => {
        const otpRecord = await Otp.findOne({ email })
        
        return otpRecord
    },

    deleteOtp: async (email: string) => {
        await Otp.deleteOne({ email })
    }
}