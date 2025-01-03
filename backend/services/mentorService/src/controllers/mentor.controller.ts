import { NextFunction, Request, Response } from "express";
import { MentorService } from "../services/implementation/mentor.service";
import { uploadFile } from "../utils/upload";
import fs from 'fs'
import { HttpStatus } from "../enums/http.status";
import { JwtPayload } from "jsonwebtoken";
import { errorResponse, successResponse } from "../utils/response.handler";
import CustomError from "../utils/custom.error";


interface ParamsData {
    search: string;
    priceRange: number;
    experience: string;
    expertise: string;
    rating: number;
    location: string;
    page: number;
    limit: number
}

interface customRequest extends Request {
    user?: string | JwtPayload
}

export class MentorController {

    private mentorService: MentorService
    constructor(mentorService: MentorService) {
        this.mentorService = mentorService
    }

    async applyMentor(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('-----   5      ---------');

            let { email, jobTitle,country, location, category,experience, skills, bio,
                whyBecomeMentor, greatestAchievement, company, profilePhoto,
                socialMediaUrls, introductionVideoUrl, featuredArticleUrl,
            } = req.body;
            console.log(req.body,'req.body ()()()()()()');
            if(socialMediaUrls){
                socialMediaUrls = JSON.parse(socialMediaUrls)
            }
            let s3FileUrl = ''
            if (req.file) {

                const file = req.file
                const fileContent = fs.readFileSync(file.path)
                const fileType = file.mimetype
                const fileName = `mentor/${Date.now()}_${file.originalname}`
                try {
                    const uploadResult = await uploadFile(fileContent, fileName, fileType)
                    s3FileUrl = uploadResult.Location

                } catch (error) {
                    console.error('Error uploading to S3:', error);
                    res.status(500).json({ message: 'Error uploading file to S3', error });
                }
            } else {
                console.log('No file received');
            }
            console.log(s3FileUrl, 's3FileUrl');


            const response = await this.mentorService.mentorDetails(email, jobTitle,country, location, category,experience, JSON.parse(skills), bio,
                whyBecomeMentor, greatestAchievement, company, s3FileUrl,
                socialMediaUrls, introductionVideoUrl, featuredArticleUrl)

            console.log(response, 'response in mentor controller');

            return successResponse(res,HttpStatus.OK,"Mentor details updated",response)
        } catch (error) {
            console.error('Error founded in apply mentor form ', error);
            next(error)
        }
    }


    async getAllMentors(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('-----   6      ---------');

            const response = await this.mentorService.getAllMentors()
            return successResponse(res,HttpStatus.OK,"Sent all mentors",response)
        } catch (error) {
            console.error('Error founded in get all mentors ');
            next(error)
        }
    }


    async getMentor(req: Request, res: Response, next: NextFunction) {
        console.log('-----   7      ---------');

        try {
            const { id } = req.params
            const response = await this.mentorService.getMentor(id)
            return successResponse(res,HttpStatus.OK,"Sent mentor",{mentor:response})
        } catch (error) {
            console.error('Error founded in mentor.controller getMentor', error);
            next(error)
        }
    }

    async updateMentor(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('-----   8      ---------');

            const { id } = req.params
            console.log(id, 'req.params  . . . . ');

            const data = req.body
            const response = await this.mentorService.updateMentorData(id, data)
            console.log(response, 'response in conttroller updatementor');
            return successResponse(res,HttpStatus.OK,"Mentor updation successfully done",response)
        } catch (error) {
            console.error('Error founded in update mentor', error);
            next(error)
        }
    }


    async updateMentorSessionPrice(req: customRequest, res: Response, next: NextFunction) {
        try {
            console.log('=====    ========    =================    ');
            const user = req.user as JwtPayload
            console.log(user, 'user id updater mentor session price')
            const data = req.body
            console.log(req.body, 'req.body')
            const response = await this.mentorService.updateSessionPrice(user.id, data)
            console.log(response, 'respoe');
            return successResponse(res, HttpStatus.OK, "Session price updated", response)
        } catch (error) {
            next(error)
        }
    }

    async getMentorDetails(req: customRequest, res: Response, next: NextFunction) {
        try {
            console.log('-----   9      ---------');

            const user = req.user as JwtPayload
            const response = await this.mentorService.getMentor(user.id)
            return successResponse(res, HttpStatus.OK, "mentor data sent", response)
        } catch (error) {
            console.error('Error founded in get mentor details', error);
        }
    }

    async getAllmentorWithMergedUserData(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('-----   10      ---------');

            console.log('kfjkdjfdkfjdkjfdkfjdkfjdkjfk');
            const { search = '', priceRange = '0', experience = '', expertise = '', rating = '0', location = '', page = '1', limit = '' } = req.query;
            // const params = req.query
            const params: ParamsData = {
                search: search as string,
                priceRange: parseInt(priceRange as string, 10),
                experience: experience as string,
                expertise: expertise as string,
                rating: parseFloat(rating as string),
                location: location as string,
                page: parseInt(page as string, 10),
                limit: parseInt(limit as string, 10),
            }

            console.log(search, priceRange, experience, expertise, rating, location, page, limit, 'params ')
            const response = await this.mentorService.getAllmentorWithMergedUserData(params)
            return successResponse(res, HttpStatus.OK, "Mentors with filtered data sent", response)
        } catch (error) {
            console.error('Error founded in getAllmentorWithMergedUserData', error);
            next(error)
        }
    }

    async getMentorSpecificData(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('-----   11      ---------');

            const { id } = req.params
            const response = await this.mentorService.getMentorSpecificData(id)
            if (!response) {
                return errorResponse(res, HttpStatus.NOT_FOUND, "Not founded mentor details")
            }

            return successResponse(res, HttpStatus.OK, "Mentor data send", response)
        } catch (error) {
            console.error('Error founded in get mentor specific data controller', error);
            next(error)
        }
    }
}

