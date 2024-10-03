import mongoose, { Types } from "mongoose";
import { Mentor } from "../model/mentorModel";
import { User } from "../model/userModel";

export const mentorRepository = {
    findByEmail: async (email: string) => {
        return await Mentor.findOne({ email })
    },
    isMentor: async (email: string) => {
        return await User.findOne({ email })
    },
    saveData: async (_id: Types.ObjectId, jobTitle: string, category: string, location: string,
        skills: string[], bio: string,whyBecomeMentor: string, greatestAchievement: string, company?: string, socialMediaUrls?: string[]) => {
        console.log('its $$$$$$$$   reached .........');
        try {
            const newMentor = new Mentor({
                mentor: _id,
                jobTitle,
                category,
                location,
                skills,
                bio,
                whyBecomeMentor,
                greatestAchievement,
                company,
                socialMediaUrls
            })
            console.log(newMentor, 'new mentor before #######');

            await newMentor.save()
            return newMentor
        } catch (error) {
            console.error('Error saving mentor:', error);
        }
    },
    saveData2:async(mentor:Types.ObjectId,whyBecomeMentor:string,greatestAchievement:string,introductionVideoUrl?:string,
        featuredArticleUrl?:string)=>{
            console.log('its here in save data 2 ');
            
            const updateMentor = await Mentor.updateOne({mentor},{$set:{
                whyBecomeMentor,
                greatestAchievement,
                introductionVideoUrl,
                featuredArticleUrl
            }})
            console.log(updateMentor,'update mentor');
            return updateMentor
            
        }
}