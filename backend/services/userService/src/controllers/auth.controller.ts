import { Request, Response } from "express";
// import { AuthService } from "../services/auth.service";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { HttpStatus } from "../enums/http.status";
import { setRefreshTokenCookie } from "../utils/tokenCookie.util";
import { createResponse, sendResponse } from "../utils/response.handler";
import { generateAccessToken } from "../utils/token.util";
import { IAuthService } from "../services/interface/IAuth.service";
interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}

export class AuthController {
    private authService: IAuthService

    
    constructor(authService: IAuthService) {
        console.log('AuthController constructed:', !!authService);
        this.authService = authService
    }

    async signup(req: Request, res: Response) {
        try {
            const { email } = req.body
            console.log(email, 'email in sign u p  up ');
            console.log(req.body, 'reqq.   bbbbooodyddydy');


            const user = await this.authService.signUp(email)
            return res.json(user)
        } catch (error) {
            console.error('error showing in auth controller signup', error);
            // return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Internal server error' })
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(createResponse(false, 'Internal server error'))
        }
    }


    async verifyOtp(req: Request, res: Response) {
        try {

            const { fullName, email, password, role, otp } = req.body
            console.log(req.body, 'rq.body ');
            console.log(fullName, 'fullname', email, 'email', password, 'passowrd', role, 'role', otp, 'otp');


            const result = await this.authService.verifySignUpOtp(fullName, email, password, role, otp)
            console.log(result, 'result in otp verification controller ');

            if (result?.success) {

                if (result.data?.role === 'mentee') {
                    setRefreshTokenCookie(res, result.data.refreshToken!)

                    return res.status(HttpStatus.OK).json({
                        success: true, message: result?.message, accessToken: result?.data.accessToken,
                        role: result.data.role
                    })
                } else {
                    return res.json(result)
                }
            } else {
                return res.json({ success: false, message: result?.message })
            }
        } catch (error) {
            console.error('Error founded in verify otp ', error);
        }
    }


    async resendOtp(req: Request, res: Response) {
        try {
            const { email } = req.body
            const otpToService = await this.authService.resendOtpWork(email)
            return res.json(otpToService)
        } catch (error) {
            console.error('Error founded in resend otp', error);
        }
    }


    async signin(req: Request, res: Response) {
        console.log('Signin called:', !!this.authService);
        try {
            const { email, password, role } = req.body
            const result = await this.authService.signIn(email, password, role)
            if (result?.success) {
                // setRefreshTokenCookie(res, result.refreshToken!)

                return res
                    .cookie('refreshToken', result.refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 7 * 24 * 60 * 1000,

                    }).
                    status(HttpStatus.OK).json({
                        success: true, message: result?.message, accessToken: result?.accessToken
                        , user: result?.checkuser
                    })
            } else {
                return res.json({ success: false, message: result?.message })
            }
        } catch (error) {
            console.error('Error founded in sign in', error);
        }
    }


    async googleLogin(req: Request, res: Response) {
        try {
            const { email, name, role } = req.body

            const result = await this.authService.signInWithGoogle(email, name, role)
            if (result?.success) {
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 1000,
                })
                return res.json({
                    success: true, message: result?.message, accessToken: result?.accessToken,
                    role, exist: result.exist, user: result.user
                })
            } else {
                return res.json({ success: false, message: result?.message })
            }
        } catch (error) {
            console.error('Error founded in google login ', error);
        }
    }


    async forgetPassword(req: Request, res: Response) {
        try {
            const { email } = req.body
            const response = await this.authService.sendMail(email)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in forget password', error);
        }
    }


    async resetPassword(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body
            const response = await this.authService.resetPassword(email, password, confirmPassword)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in reset password', error);
        }
    }


    async setNewAccessToken(req: Request, res: Response) {
        console.log('++++++++++++++++++++++++++++++++++++');
        try {
            const refreshToken = req.cookies.refreshToken
            console.log(refreshToken, '%%%%%%%%%%%%%%%%');

            if (!refreshToken) return res.status(HttpStatus.FORBIDDEN).json({ message: "No refresh token provided" })
            const secret = process.env.REFRESH_TOKEN_SECRET
            if (!secret) {
                return res.json({ message: "internal server error" })
            }
            const decoded = jwt.verify(refreshToken, secret)
            console.log(decoded, 'decoded in refresh token ');

            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'email' in decoded && 'role' in decoded) {
                console.log('its entere herer  herere ');

                // const newAccessToken = jwt.sign({ id: (decoded as JwtPayload).id, role: (decoded as JwtPayload).role }, process.env.ACCESS_TOKEN_SECRET!, {
                //     expiresIn: '15m',
                // });
                const newAccessToken = generateAccessToken({ id: (decoded as JwtPayload).id, email: (decoded as JwtPayload).email, role: (decoded as JwtPayload).role })

                return res.json({ accessToken: newAccessToken });
            } else {
                res.clearCookie('refreshToken')
                return res.status(HttpStatus.FORBIDDEN).json({ message: "Invalid token payload" });
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.clearCookie('refreshToken')
                return res.status(HttpStatus.FORBIDDEN).json({ message: "Refresh token expired, please log in again" })
            }
            console.error("Error verifying refresh token:", error);
        }
    }



    async changePassowrd(req:CustomeRequest,res:Response){
        try {
            const user = req.user as JwtPayload
            if(!user){
                res.json({success:false,message:"user does not existed"})
            }
            const data= req.body
            console.log(data,'data in change password controller ');
            
            const passwordUpdate = await this.authService.passwordUpdate(user.id,data)
            if(passwordUpdate?.success){
                res.status(HttpStatus.OK).json({success:true,message:passwordUpdate?.message})
            }else{
                res.status(HttpStatus.OK).json({success:false,message:passwordUpdate?.message})
            }
            
        } catch (error) {
            console.error('Error founded in chagne password',error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:'Internal server error'})
        }
    }


    async logout(req: Request, res: Response) {
        try {
            console.log('logot here - - - - - - - ');

            res.clearCookie('refreshToken')
            return res.json({ message: "Logged out successfully" })
        } catch (error) {
            console.error('Error founded in logout', error);
        }
    }
}

// export default new AuthController(this.authService)