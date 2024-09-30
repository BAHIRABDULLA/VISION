
import { signUp } from "./signUpController";
import { verifyOtp,resendOtp } from "./otpController";
import { googleSignIn } from "./googleSignIn";
import { signIn } from "./signInController";
import {forgetPassword} from './forgetPassController'

export const authController = {
  signUp,verifyOtp,resendOtp,googleSignIn,signIn,forgetPassword
}