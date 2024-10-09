
import { signUp } from "./signUpController";
import { verifyOtp,resendOtp } from "./otpController";
import { googleSignIn } from "./googleSignIn";
import { signIn } from "./signInController";
import {forgetPassword} from './forgetPassController'
import { resetPassword } from "./resetPassController";
import { setNewAccessToken } from "./refreshToken";
import { getAllUsers } from "./users";

export const authController = {
  signUp,verifyOtp,resendOtp,googleSignIn,signIn,forgetPassword,resetPassword 
  , setNewAccessToken,getAllUsers
}