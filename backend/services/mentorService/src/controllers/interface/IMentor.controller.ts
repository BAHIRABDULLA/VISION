import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"

interface customRequest extends Request {
    user?: string | JwtPayload
}


export interface IMentorController {
    applyMentor(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllMentors(req: Request, res: Response, next: NextFunction): Promise<void>
    getMentor(req: Request, res: Response, next: NextFunction): Promise<void>
    updateMentor(req: Request, res: Response, next: NextFunction): Promise<void>
    updateMentorSessionPrice(req: customRequest, res: Response, next: NextFunction): Promise<void>
    getMentorDetails(req: customRequest, res: Response, next: NextFunction): Promise<void>
    getAllmentorWithMergedUserData(req: Request, res: Response, next: NextFunction): Promise<void>
    getMentorSpecificData(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void>
}