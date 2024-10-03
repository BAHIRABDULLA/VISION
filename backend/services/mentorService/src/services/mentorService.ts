import { User } from "../model/userModel";


export const mentorService = {
    mentorDetails: async ( jobTitle: string, category: string, location: string,
        company: string, skills: string[], bio: string, socialMediaUrl: string[]) => {

    },
    registerMentor:async(mentorData:any)=>{
        try {
            const {_id,fullName,email,password}= mentorData
            const mentor = new User({
                _id,
                fullName,
                email,
                password
            })
            await mentor.save()
            console.log(mentor,'mentor in mentor controller ');
            
        } catch (error) {
            console.log('Error registering mentor',error);
        }
    }
}