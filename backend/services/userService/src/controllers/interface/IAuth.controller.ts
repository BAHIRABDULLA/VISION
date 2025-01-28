
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}


export interface IAuthController {
    signup(req: Request, res: Response): Promise<void>
    verifyOtp(req: Request, res: Response): Promise<void>
    resendOtp(req: Request, res: Response): Promise<void>
    forgetPassword(req: Request, res: Response): Promise<void>
    resetPassword(req: Request, res: Response): Promise<void>
    changePassowrd(req: CustomeRequest, res: Response): Promise<void>
    logout(req: Request, res: Response): Promise<void>
}