
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}


export interface IUserController {
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>
    updateUserApprovalStatus(req: Request, res: Response, next: NextFunction): Promise<void>
    profileUpdate(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>
    getCountUserAndMentor(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>
    updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void>
}