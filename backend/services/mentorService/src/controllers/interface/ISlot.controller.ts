import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"

interface customRequest extends Request {
    user?: string | JwtPayload
}


export interface ISlotController {
    createSlot(req: customRequest, res: Response, next: NextFunction): Promise<void>
    getSlot(req: customRequest, res: Response, next: NextFunction): Promise<void>
    deleteSlot(req: customRequest, res: Response, next: NextFunction): Promise<void>
    bookingSlot(req: customRequest, res: Response, next: NextFunction): Promise<void>
    getBookingSlotDetails(req: Request, res: Response, next: NextFunction): Promise<void>
    getBookingSlot(req: customRequest, res: Response, next: NextFunction): Promise<void>
    handleBookingSessionStatus(req: Request, res: Response, next: NextFunction): Promise<void>
}