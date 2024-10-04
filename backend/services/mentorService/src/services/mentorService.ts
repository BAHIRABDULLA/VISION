import { IMentor } from "../model/mentorModel";
import { User } from "../model/userModel";
import { mentorRepository } from "../repositories/mentorRepository";


export const mentorService = {
    mentorDetails: async (data: IMentor, email: string) => {
        try {
            const { jobTitle, category, location, company, skills, bio, socialMediaUrls } = data
            console.log(jobTitle, category, location, skills, bio, '%%%%%%');

            const checkUser = await mentorRepository.isMentor(email)
            console.log(checkUser,'check user ');
            
            if (!checkUser) {
                return { success: false, message: "Mentor does not existed " }
            }
            console.log('its reached in mentro shervice');
            let whyBecomeMentor = '', greatestAchievement = ''
            const saveMentorData = await mentorRepository.saveData(checkUser._id, jobTitle, category, location, skills, bio,
                whyBecomeMentor, greatestAchievement, company, socialMediaUrls)
            if (!saveMentorData) {
                return { success: false, message: "Failed to save mentor data" }
            } else {
                return { success: true, message: "Mentro data saved successfully", saveMentorData }
            }
        } catch (error) {
            console.error('Error insertig mentro data', error);
        }
    },
    mentorDetails2: async (data: IMentor, email: string) => {
        try {
            const checkUser = await mentorRepository.isMentor(email)
            console.log(checkUser,'check user in mentrodetailes 2');
            
            if (!checkUser) {
                return { success: false, message: "Mentor does not existed" }
            }
            const { introductionVideoUrl, featuredArticleUrl, whyBecomeMentor, greatestAchievement } = data
            const updateMentor = await mentorRepository.saveData2(checkUser._id, whyBecomeMentor, greatestAchievement,
                introductionVideoUrl, featuredArticleUrl)
            
            if(!updateMentor){
                return {success:false , message:"Data not updated"}
            }
            return {success:true,message:"Mentor data updated",updateMentor}
        } catch (error) {
            console.error('Error insertin mentor data 2 ', error);
        }
    },
    registerMentor: async (mentorData: any) => {
        try {
            const { _id, fullName, email, password } = mentorData
            const mentor = new User({
                _id,
                fullName,
                email,
                password
            })
            await mentor.save()
            console.log(mentor, 'mentor in mentor controller ');

        } catch (error) {
            console.log('Error registering mentor', error);
        }
    }
}