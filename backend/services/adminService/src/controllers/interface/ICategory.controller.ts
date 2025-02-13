import { Request, Response, NextFunction } from "express"


export interface ICategoryController {
    getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void>
    addNewCategory(req: Request, res: Response, next: NextFunction): Promise<void>
    updateCategory(req: Request, res: Response, next: NextFunction): Promise<void>
    updateCategoryStatus(req: Request, res: Response, next: NextFunction): Promise<void>
}