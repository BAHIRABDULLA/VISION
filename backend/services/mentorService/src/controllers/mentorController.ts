import { Request, Response } from "express";
import { mentorService } from "../services/mentorService";

export const mentorController = {
    applyMentor1: async (req: Request, res: any) => {
        const { data, email } = req.body;
        console.log(data, email, 'data email');
        // const {jobTitle,category,location,company,skills,bio,socialMediaUrls} =data


        const response = await mentorService.mentorDetails(data, email)
        return res.json(response)
    },
    applyMentor2: async (req: Request, res: any) => {
        const { data, email } = req.body
        console.log(data, email, 'data , email ');
        const response = await mentorService.mentorDetails2(data,email)
        return res.json(response)
    }
}