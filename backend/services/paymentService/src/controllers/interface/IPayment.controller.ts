
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}


export interface IPaymentController {
    createSessionForStripe(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>
    mentorshipCheckoutSession(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>
    findCoursePayment(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>
    findTransactions(req: Request, res: Response, next: NextFunction): Promise<void>
    getUserBillingHistory(req: CustomeRequest, res: Response, next: NextFunction): Promise<void>
}