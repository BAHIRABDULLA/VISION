import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";



export interface IResourceController {
    getResources(req: Request, res: Response, next: NextFunction):Promise<void>
    createResource(req: Request, res: Response):Promise<void>
}