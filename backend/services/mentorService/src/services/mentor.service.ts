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
            if(profilePhoto==''){
                profilePhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            }
            const mentorData = {
                mentor: checkUser._id,
                jobTitle, location, category, company, skills, bio, socialMediaUrls,
                introductionVideoUrl, featuredArticleUrl, whyBecomeMentor,
                greatestAchievement,profilePhoto
            }
            
            const newMentor = await this.mentorRepoistory.create(mentorData);
            console.log(newMentor, 'new mentor in mentor.servcie');

            const data = {
                id: newMentor.mentor
            }
            const lala = await userApi.post('/update-mentor-form', data)
            console.log(lala, 'lala la l ala la la ');

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
}