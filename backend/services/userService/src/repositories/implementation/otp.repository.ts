import IOtp from "../../interfaces/IOtp";
import Otp from "../../models/otp.model"
import IOtpRepository from "../interface/IOtp.repository";
import BaseRepository from "./base.repository";

export class OtpRepository  extends BaseRepository<IOtp> implements IOtpRepository {

   
    async findOtpByEmail  (email:string):Promise<IOtp[] | null > {
        try {
            const otpRecord = await Otp.find({ email })
            return otpRecord
        } catch (error) {
            console.error('Error founded in findOtp by email',error);
            return null
        }
    }


    async deleteOtp  (email: string){
        try {
            await Otp.deleteMany({ email })
        } catch (error) {
            console.error('Error founded in delete otp',error);
        }
    }
}