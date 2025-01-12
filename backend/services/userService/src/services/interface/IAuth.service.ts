import IUser from "../../interfaces/IUser"
import { SignInResult } from "../implementation/auth.service";

type common = {
    success: boolean;
    message: string;
    data?: {
        user?: IUser;
        role?: string;
        accessToken?: string;
        refreshToken?: string;
    };
    refreshToken?: string;
    accessToken?: string;
    exist?: boolean;
    user?: object;
}


export interface IAuthService {
    signUp(email:string):Promise<common | undefined >
    verifySignUpOtp(fullName:string,email:string,password:string,role:string,otp:string,type:string):Promise<common | undefined>
    resendOtpWork(email:string):Promise<common | undefined>
    signInWithGoogle(email:string,name:string,role:string):Promise<common| undefined>
    signIn(email:string,password:string,role:string):Promise< SignInResult | undefined>
    sendMail(email:string):Promise<object | undefined>
    resetPassword(email:string,password:string,confirmPassword:string):Promise<common | undefined>
    // updateFormFieldAndPhoto(id:string,profile:string):Promise<IUser | undefined>
    passwordUpdate(id:string,data:object):Promise<common | undefined>
}