import e, { NextFunction, Request, Response } from "express";
import { MentorService } from "../../services/implementation/mentor.service";
import { generateUploadPresignedUrl } from "../../utils/upload";
import fs from 'fs'
import { HttpStatus } from "../../enums/http.status";
import { JwtPayload } from "jsonwebtoken";
import { errorResponse, successResponse } from "../../utils/response.handler";
import CustomError from "../../utils/custom.error";
import { IMentorController } from "../interface/IMentor.controller";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants";


interface ParamsData {
    search: string;
    priceRange: number;
    experience: string;
    expertise: string;
    rating: number;
    page: number;
    limit: number
}

interface customRequest extends Request {
    user?: string | JwtPayload
}

export class MentorController implements IMentorController {

    private mentorService: MentorService
    constructor(mentorService: MentorService) {
        this.mentorService = mentorService
    }


    async generateSignedUrl(req:Request,res:Response,next:NextFunction){
        try {
            const { fileName, fileType } = req.body
            if (!fileName || !fileType) {
                return res.status(400).json({
                    success: false,
                    message: 'fileName and fileType are required'
                });
            }
            const response = await generateUploadPresignedUrl(fileName,fileType)
            res.status(HttpStatus.OK).json({ signedUrl:response.url, key: fileName })
        } catch (error) {
            next(error)
        }
    }

    async applyMentor(req: Request, res: Response, next: NextFunction) {
        try {
         
            let { email, jobTitle, country, location, category, experience, skills, bio,
                whyBecomeMentor, greatestAchievement, company, file,
                socialMediaUrls, introductionVideoUrl, featuredArticleUrl,
            } = req.body;
            
            if (socialMediaUrls) {
                socialMediaUrls = JSON.parse(socialMediaUrls)
            }
            

            const response = await this.mentorService.mentorDetails(email, jobTitle, country, location, category, experience, JSON.parse(skills), bio,
                whyBecomeMentor, greatestAchievement, company, file,
                socialMediaUrls, introductionVideoUrl, featuredArticleUrl)

            return successResponse(res, HttpStatus.CREATED, SUCCESS_MESSAGES.MENTOR_UPDATED, response)
        } catch (error) {
            console.error(error,'err or  = = = =  ');
            
            next(error)
        }
    }


    async getAllMentors(req: Request, res: Response, next: NextFunction) {
        try {

            const response = await this.mentorService.getAllMentorsWithPopulatedData()
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.ALL_MENTORS_FETCHED, { response })
        } catch (error) {
            next(error)
        }
    }


    async getMentor(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params
            const response = await this.mentorService.getMentor(id)
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.MENTOR_DETAILS_FETCHED, { mentor: response })
        } catch (error) {
            next(error)
        }
    }

    async updateMentor(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params

            const data = req.body
            const response = await this.mentorService.updateMentorData(id, data)
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.MENTOR_UPDATED, response)
        } catch (error) {
            next(error)
        }
    }


    async updateMentorSessionPrice(req: customRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user as JwtPayload
            const data = req.body
            const response = await this.mentorService.updateSessionPrice(user.id, data)
            return successResponse(res, HttpStatus.OK, "Session price updated", response)
        } catch (error) {
            next(error)
        }
    }

    async getMentorDetails(req: customRequest, res: Response, next: NextFunction) {
        try {

            const user = req.user as JwtPayload
            const response = await this.mentorService.getMentor(user.id)
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.MENTOR_DETAILS_FETCHED, response)
        } catch (error) {
            next(error)
        }
    }

    async getAllmentorWithMergedUserData(req: Request, res: Response, next: NextFunction) {
        try {

            const { search = '', priceRange = '0', experience = '', expertise = '', rating = '0', page = '1', limit = '' } = req.query;
            // const params = req.query
            const params: ParamsData = {
                search: search as string,
                priceRange: parseInt(priceRange as string, 10),
                experience: experience as string,
                expertise: expertise as string,
                rating: parseFloat(rating as string),
                page: parseInt(page as string, 10),
                limit: parseInt(limit as string, 10),
            }

            const response = await this.mentorService.getAllmentorWithMergedUserData(params)
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.ALL_MENTORS_FETCHED, response)
        } catch (error) {
            next(error)
        }
    }

    async getMentorSpecificData(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params
            const response = await this.mentorService.getMentorSpecificData(id)
            if (!response) {
                return errorResponse(res, HttpStatus.NOT_FOUND, ERROR_MESSAGES.MENTOR_NOT_FOUND)
            }

            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.MENTOR_DETAILS_FETCHED, response)
        } catch (error) {
            next(error)
        }
    }


    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.mentorService.getAllCategoris()
            return successResponse(res, HttpStatus.OK, SUCCESS_MESSAGES.CATEGORY_DETAILS_FETCHED, { response })
        } catch (error) {

        }
    }
}

