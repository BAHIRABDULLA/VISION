import { IResourseService } from "../services/interface/IResource.service";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../utils/response.helper";
import { HttpStatus } from "../enums/http.status";


export class ResourseController {
    private resourceService: IResourseService;

    constructor(resourceService: IResourseService) {
        this.resourceService = resourceService
    }

    async getResources(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.resourceService.getResources()
            
            return successResponse(res,HttpStatus.OK,"Resource successfully sent",{resources:response})
        } catch (error) {
            console.error('Error founded in get resource',error);
            next(error)
        }
    }

    async createResource(req: Request, res: Response) {
        try {
            let { title,  type, course, level, topic, content } = req.body
            const data = req.body

            if (type !== 'text') {
                content = req.file
            }
            const response = await this.resourceService.createResourse(title, type, course, level, topic, content)
            return successResponse(res, HttpStatus.CREATED, "Resource created")

        } catch (error) {
            console.error('Error founded in create course', error);
        }
    }


    async getResourceById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await this.resourceService.getResourceById(id)
            return res.json(response)
        } catch (error) {
            console.error('Error founded in get resource by id', error);
        }
    }

    async getResourcesByCourseId(req: Request, res: Response) {
        try {
            const { courseId } = req.params
            const response = await this.resourceService.getResourcesByCourseId(courseId)
            return res.status(HttpStatus.OK).json(response)
        } catch (error) {
            console.error('Error founded in get resource by course id', error);
        }
    }

}