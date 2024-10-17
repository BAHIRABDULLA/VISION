import { Request, Response } from "express";
import { MentorService } from "../services/mentor.service";
import { uploadFile } from "../utils/upload";
import fs from 'fs'

const mentorService = new MentorService()

// export const mentorController = {
//     applyMentor1: async (req: Request, res: any) => {
//         const { data, email } = req.body;
//         console.log(data, email, 'data email');
//         // const {jobTitle,category,location,company,skills,bio,socialMediaUrls} =data


//         const response = await mentorService.mentorDetails(data, email)
//         return res.json(response)
//     },
//     applyMentor2: async (req: Request, res: any) => {
//         const { data, email } = req.body
//         console.log(data, email, 'data , email ');
//         const response = await mentorService.mentorDetails2(data, email)
//         return res.json(response)
//     },
//     getAllMentors: async (req: Request, res: Response) => {
//         const response = await mentorRepository.getAllMentors()
//         res.json(response)
//     }
// }

export class MentorController {
    async applyMentor(req: Request, res: Response) {
        try {
            console.log(req.file, 'req.file dkfdkfjdkjf');
            const {email, jobTitle, location, category, skills, bio,
                whyBecomeMentor, greatestAchievement, company, profilePhoto,
                socialMediaUrls, introductionVideoUrl, featuredArticleUrl,
            } = req.body;

            console.log(email, jobTitle, 'data data data data data adta');
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
            res.json(response)
        } catch (error) {

        }
    }
    async getAllMentors(req: Request, res: Response) {
        const response = await mentorService.getAllMentors()
        res.json(response)
    }
    async getMentor(req:Request,res:Response){
        try {
            const {id} = req.params
            const response = await mentorService.getMentor(id)
            console.log(response,'response in mentro controller getmentor');
            
            res.json({success:true,mentor:response})
        } catch (error) {
            console.error('Error founded in mentor.controller getMentor',error);
            
        }
  
    }
}