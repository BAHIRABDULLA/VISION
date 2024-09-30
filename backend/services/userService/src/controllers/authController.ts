
import { signUp } from "./signUpController";
import { verifyOtp,resendOtp } from "./otpController";
import { googleSignIn } from "./googleSignIn";
import { signIn } from "./signInController";

export const authController = {
  signUp,verifyOtp,resendOtp,googleSignIn,signIn
}