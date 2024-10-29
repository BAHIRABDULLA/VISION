import { sendMentorData } from "../events/rabbitmq/publisher";
import { Mentor } from "../model/mentor.model";
import { User } from "../model/user.model";
import { MentorRepository } from "../repositories/implementation/mentor.repository";
import { UserRepository } from "../repositories/implementation/user.repository";
import axios from "axios";


const userApi = axios.create({
    baseURL: 'http://localhost:4001/'
})

export class MentorService {
    private mentorRepoistory
    private userRepository
    constructor() {
        this.mentorRepoistory = new MentorRepository(Mentor)
        this.userRepository = new UserRepository(User)
    }


    async mentorDetails(email: string, jobTitle: string, location: string, category: string, skills: string[], bio: string,
        whyBecomeMentor: string, greatestAchievement: string, company?: string, profilePhoto?: any, socialMediaUrls?: string[], introductionVideoUrl?: string, featuredArticleUrl?: string,) {
        try {
            const checkUser = await this.userRepository.isMentor(email)

            if (!checkUser) {
                return { success: false, message: "User does not existed " }
            }


            const mentorData = {
                mentor: checkUser._id,
                jobTitle, location, category, company, skills, bio, socialMediaUrls,
                introductionVideoUrl, featuredArticleUrl, whyBecomeMentor,
                greatestAchievement
            }

            const newMentor = await this.mentorRepoistory.create(mentorData);


            console.log(newMentor, 'new mentor in mentor.servcie');

            const data = {
                id: newMentor.mentor
            }

            if (profilePhoto == '') {
                profilePhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            }
            await sendMentorData(newMentor.toObject(), profilePhoto)
            // const updateMentorForm = await userApi.post('/update-mentor-form', data)
            // console.log(updateMentorForm.data, 'lala la l ala la la ');

            if (!newMentor) {
                return { success: false, message: 'Mentor details not updated' }
            }
            return { success: true, message: 'Mentor details updated ', newMentor }
        } catch (error) {
            console.error('Error founded saving mentor data', error);
        }
    }


    async registerMentor(mentorData: any) {
        try {
            const mentor = this.userRepository.create(mentorData)
        } catch (error) {
            console.log('Error registering mentor', error);
        }
    }


    async getAllMentors() {
        try {
            const mentors = await this.mentorRepoistory.findAll()
            return mentors
        } catch (error) {
            console.error('Error founded in fetching all mentors', error);
        }
    }


    async getMentor(id: string) {
        try {
            const findMentor = await this.mentorRepoistory.findMentor(id)
            return findMentor
        } catch (error) {
            console.error('Error founded in get mentor', error);
        }
    }

    async updateMentorData(id:string,data:object){
        try {
            console.log(data,'data in updata ++++++++++++++++++++++++++++++');
            
            const updatingMentor = await this.mentorRepoistory.update(id,data)
            console.log(updatingMentor,'respon in service in update mentor data ');
            if(!updatingMentor){
                return { success: false, message: 'Mentor details not updated' }
            }
            await sendMentorData(updatingMentor.toObject())
            return {sucess:true,message:"Mentor details is updated"}
            
        } catch (error) {
            console.error('Error founed in update mentor data',error);
        }
    }
}