import { Request, Response } from "express";
import { MentorService } from "../services/mentor.service";

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
            const { data, email } = req.body;
            const response = await mentorService.mentorDetails(data, email)
             res.json(response)
        } catch (error) {

        }
    }
    async getAllMentors(req: Request, res: Response) {
        const response = await mentorService.getAllMentors()
        res.json(response)
    }
}