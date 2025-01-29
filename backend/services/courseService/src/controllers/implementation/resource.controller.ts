import { IResourseService } from "../../services/interface/IResource.service";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "../../utils/response.helper";
import { HttpStatus } from "../../enums/http.status";
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import { IResourceController } from "../interface/IResource.controller";
dotenv.config()


const accessKey = process.env.S3_BUCKET_ACCESS_KEY
const secretKey = process.env.S3_BUCKET_SECRET
export const s3 = new AWS.S3({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: 'ap-south-1'
})



export class ResourseController implements IResourceController {
    private resourceService: IResourseService;

    constructor(resourceService: IResourseService) {
        this.resourceService = resourceService
    }


    async generateSignedUrl(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileName, fileType } = req.body
            if (!fileName || !fileType) {
                return res.status(400).json({
                    success: false,
                    message: 'fileName and fileType are required'
                });
            }
            const params = {
                Bucket: process.env.BUCKET_NAME!,
                Key: fileName,
                Expires: 3600,
                ContentType: fileType,

            }
            const signedUrl = await s3.getSignedUrlPromise('putObject', params)
            res.status(HttpStatus.OK).json({ signedUrl, key: fileName })
        } catch (error) {
            next(error)
        }
    }

    async getResources(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.resourceService.getResources()

            return successResponse(res, HttpStatus.OK, "Resource successfully sent", { resources: response })
        } catch (error) {
            next(error)
        }
    }

    async createResource(req: Request, res: Response, next: NextFunction) {
        try {
            let { title, type, course, level, topic, content } = req.body
            console.log(content, 'content ');

            const data = req.body
            const response = await this.resourceService.createResourse(title, type, course, level, topic, content)
            return successResponse(res, HttpStatus.CREATED, "Resource created")

        } catch (error) {
            next(error)
        }
    }


    async getResourceById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const response = await this.resourceService.getResourceById(id)
            return res.status(HttpStatus.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getResourcesByCourseId(req: Request, res: Response, next: NextFunction) {
        try {
            const { courseId } = req.params
            const response = await this.resourceService.getResourcesByCourseId(courseId)
            return res.status(HttpStatus.OK).json({ response })
        } catch (error) {
            next(error)
        }
    }

}