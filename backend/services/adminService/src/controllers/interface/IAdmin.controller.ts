import { Request, Response, NextFunction } from "express"


export interface IAdminController {
    loginControl(req: Request, res: Response, next: NextFunction): Promise<void>
    getDashbaordData(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>
    logout(req: Request, res: Response, next: NextFunction): Promise<void>
    setNewAccessToken(req: Request, res: Response, next: NextFunction): Promise<void>
    mentorApproval(req: Request, res: Response, next: NextFunction): Promise<void>
    updateUserActiveStatus(req: Request, res: Response, next: NextFunction): Promise<void>
   
}