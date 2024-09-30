
import { signUp } from "./signUpController";
import { verifyOtp,resendOtp } from "./otpController";

export const authController = {
  signUp,verifyOtp,resendOtp
}