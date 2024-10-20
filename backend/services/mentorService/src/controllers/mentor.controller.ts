import { Request, Response } from "express";
import { MentorService } from "../services/mentor.service";
import { uploadFile } from "../utils/upload";
import fs from 'fs'

const mentorService = new MentorService()



export class MentorController {


    async applyMentor(req: Request, res: Response) {
        try {
            const { email, jobTitle, location, category, skills, bio,
                whyBecomeMentor, greatestAchievement, company, profilePhoto,
                socialMediaUrls, introductionVideoUrl, featuredArticleUrl,
            } = req.body;

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
            

            const response = await mentorService.mentorDetails(email, jobTitle, location, category, skills, bio,
                whyBecomeMentor, greatestAchievement, company, s3FileUrl,
                socialMediaUrls, introductionVideoUrl, featuredArticleUrl)

            console.log(response, 'response in mentor controller');

            res.json(response)
        } catch (error) {
            console.error('Error founded in apply mentor form ', error);
        }
    }


    async getAllMentors(req: Request, res: Response) {
        try {
            const response = await mentorService.getAllMentors()
            res.json(response)
        } catch (error) {
            console.error('Error founded in get all mentors ');
        }

    }


    async getMentor(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await mentorService.getMentor(id)

            res.json({ success: true, mentor: response })
        } catch (error) {
            console.error('Error founded in mentor.controller getMentor', error);

        }
    }
}