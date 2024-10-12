import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import jwt, { JwtPayload } from 'jsonwebtoken'


class AuthController {
    async signup(req: Request, res: Response) {
        console.log('here is first');
        try {
            const { fullName, email, password, role } = req.body
            console.log(fullName, 'full', email, 'emai', password, 'pass', role, 'role');
            const userData = { fullName, email, role }
            const user = await authService.signUp(fullName, email, password, role)
            return res.json(user)
        } catch (error) {
            console.error('error showing in auth controller signup', error);
            return res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }

    async signin(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body
            const result = await authService.signIn(email, password, role)
            if (result?.success) {
                console.log(result?.refreshToken, 'result?.refreshToken');
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/refresh-token'
                })
                return res.json({
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


    async forgetPassword(req: Request, res: Response) {
        try {
            const { email } = req.body
            const response = await authService.sendMail(email)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in forget password', error);

        }
    }


    async googleLogin(req: Request, res: Response) {
        try {
            console.log('its reached in google sign in backend');

            const { email, name, role } = req.body
            console.log(email, name, role, 'email && name && role in backend ');

            const result = await authService.signInWithGoogle(email, name, role)
            if (result?.success) {
                console.log(result?.refreshToken, 'result?.refreshToken');
                res.cookie('refreshToken', result.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/refresh-token'
                })
                return res.json({
                    success: true, message: result?.message, accessToken: result?.accessToken,
                    role, exist: result.exist
                })
            } else {
                return res.json({ success: false, message: result?.message })
            }
        } catch (error) {
            console.error('Error founded in google login ', error);
        }
    }


    async resetPassword(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body
            console.log(email, 'email', password, 'password', confirmPassword, 'confirmPassword in the resetPass');
            const response = await authService.resetPassword(email, password, confirmPassword)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in reset password', error);
        }
    }


    async verifyOtp(req: Request, res: Response) {
        try {
            const { email, otp } = req.body
            console.log(email, 'email', otp, 'otp in verify otp controller ---')
            const result = await authService.verifySignUpOtp(email, otp)
            if (result?.success) {
                console.log(result?.refreshToken, 'result?.refreshToken');
                if (result.role === 'mentee') {
                    res.cookie('refreshToken', result.refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        path: '/refresh-token'
                    })
                    return res.json({
                        success: true, message: result?.message, accessToken: result?.accessToken,
                        role: result.role,
                    })
                } else {
                    res.json(result)
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
            console.log(email);
            const otpToService = await authService.resendOtpWork(email)
            return res.json(otpToService)
        } catch (error) {
            console.error('Error founded in resend otp', error);
        }
    }




    async setNewAccessToken(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) return res.status(403).json({ message: "No refresh token provided" })
        try {
            const secret = process.env.REFRESH_TOKEN_SECRET
            if (!secret) {
                return res.json({ message: "internal server error" })
            }
            const decoded = jwt.verify(refreshToken, secret)

            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'role' in decoded) {
                const newAccessToken = jwt.sign({ id: (decoded as JwtPayload).id, role: (decoded as JwtPayload).role }, process.env.ACCESS_TOKEN_SECRET!, {
                    expiresIn: '15m',
                });
                return res.json({ accessToken: newAccessToken });
            } else {
                return res.status(403).json({ message: "Invalid token payload" });
            }
        } catch (error) {
            console.error("Error verifying refresh token:", error);
        }
    }
}

export default new AuthController()