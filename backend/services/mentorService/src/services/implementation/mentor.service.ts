import { HttpStatus } from "../../enums/http.status";
import { sendMentorData } from "../../events/rabbitmq/publisher";
import axios from "axios";
import CustomError from "../../utils/custom.error";
import { IUser } from "../../interface/IUser";
import { IMentor } from "../../interface/IMentor";
import mongoose, { ObjectId } from 'mongoose'
import { IMentorService, socialMediaUrl } from "../interface/IMentor.service";
import { IMentorRepository } from "../../repositories/interface/IMentor.repository";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { ISlotRepository } from "../../repositories/interface/ISlot.repository";


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

const userApi = axios.create({
    baseURL: 'http://localhost:4001/'
})

export class MentorService implements IMentorService {
    private mentorRepoistory: IMentorRepository
    private userRepository: IUserRepository
    private slotRepository: ISlotRepository
    constructor(mentorRepository: IMentorRepository, userRepository: IUserRepository, slotRepository: ISlotRepository) {
        this.mentorRepoistory = mentorRepository
        this.userRepository = userRepository
        this.slotRepository = slotRepository
    }


    async mentorDetails(email: string, jobTitle: string, location: string, category: string, skills: string[], bio: string,
        whyBecomeMentor: string, greatestAchievement: string, company?: string, profilePhoto?: any, socialMediaUrls?: socialMediaUrl, introductionVideoUrl?: string, featuredArticleUrl?: string,) {
        try {
            console.log(socialMediaUrls,'social medial urls +++++++++++',category,jobTitle,'category ,jobtitle');

            const checkUser = await this.userRepository.isMentor(email)

            if (!checkUser) {
                throw new CustomError("User does not existed", HttpStatus.UNAUTHORIZED)
            }


            const mentorData = {
                mentor: checkUser._id,
                jobTitle, location, category, company, skills, bio, socialMediaUrls,
                introductionVideoUrl, featuredArticleUrl, whyBecomeMentor,
                greatestAchievement
            }

            const newMentor = await this.mentorRepoistory.create(mentorData);
            await this.userRepository.update(checkUser._id.toString(), { isMentorFormFilled: true })

            console.log(newMentor, 'new mentor in mentor.servcie');

            const data = {
                id: newMentor.mentor
            }

            if (profilePhoto == '') {
                profilePhoto = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            }
            await sendMentorData(newMentor.toObject(), profilePhoto)

            if (!newMentor) {
                throw new CustomError("Mentor details not updated", HttpStatus.UNAUTHORIZED)
            }

            return newMentor
        } catch (error) {
            console.error('Error founded saving mentor data', error);
            throw error
        }
    }


    async registerMentor(mentorData: any) {
        try {
            const mentor = this.userRepository.create(mentorData)
        } catch (error) {
            console.log('Error registering mentor', error);
            throw error
        }
    }


    async getAllMentors() {
        try {
            const mentors = await this.mentorRepoistory.findAll()
            return mentors
        } catch (error) {
            console.error('Error founded in fetching all mentors', error);
            throw error
        }
    }


    async getMentor(id: string) {
        try {
            const findMentor = await this.mentorRepoistory.findMentor(id)
            return findMentor
        } catch (error) {
            console.error('Error founded in get mentor', error);
            throw error
        }
    }

    async updateMentorData(id: string, data: IMentor) {
        try {
            console.log(data, 'data in updata ++++++++++++++++++++++++++++++');
            const findUser = await this.userRepository.findById(id)
            console.log(findUser, 'find user update mentor data')
            if (findUser) {
                data.mentor = new mongoose.Types.ObjectId(id)
                const newMentor = await this.mentorRepoistory.create(data)
                if (!newMentor) {
                    throw new CustomError("Error facing to update mentor", HttpStatus.UNAUTHORIZED)
                }
                await sendMentorData(newMentor.toObject())
                await this.userRepository.update(id, { isMentorFormFilled: true })
                // return { success: true, message: "Mentor details is created" }
                return newMentor

            } else {
                const updatingMentor = await this.mentorRepoistory.update(id, data)
                console.log(updatingMentor, 'respon in service in update mentor data ');
                if (!updatingMentor) {
                    // return { success: false, message: 'Mentor details not updated' }
                    throw new CustomError("Error facing to update mentor", HttpStatus.UNAUTHORIZED)
                }
                await sendMentorData(updatingMentor.toObject())
                await this.userRepository.update(updatingMentor.mentor.toString(), { isMentorFormFilled: true })
                // return { success: true, message: "Mentor details is updated" }
                return updatingMentor
            }
        } catch (error) {
            console.error('Error founed in update mentor data', error);
            throw error
        }
    }

    async updateSessionPrice(id: string, data: {singleSessionPrice:number,monthlySubscriptionPrice:number}) {
        try {
            console.log(id, 'id in update session price service', data, 'data update ses_____')
            const {singleSessionPrice,monthlySubscriptionPrice} = data
            if((singleSessionPrice||monthlySubscriptionPrice)<50){
                throw new CustomError("session price must be at least ₹ 50 to meet minimum requirement",HttpStatus.UNAUTHORIZED)
            }
            const findMentorFormFilled = await this.userRepository.findById(id)
            console.log(findMentorFormFilled, 'find mentor form fillecdf');

            if (!findMentorFormFilled) {
                throw new CustomError('Please complete profile section', HttpStatus.NOT_FOUND)
            }
            if (findMentorFormFilled.isApproved === 'pending' || findMentorFormFilled.isApproved === 'rejected') {
                throw new CustomError("Mentorship not approved", HttpStatus.BAD_REQUEST)
            }
            const response = await this.mentorRepoistory.findMentorAndUpdate(id, data)
            console.log(response, 'response in update session price in serviced')
            return response
        } catch (error) {
            throw error
        }
    }



    async mentorApproval(data: { id: string, isApproved: 'approved' | 'rejected' | 'pending' }) {
        try {
            console.log(data, 'data')
            const { id, isApproved } = data
            await this.userRepository.update(id, { isApproved })
        } catch (error) {
            console.error('Error founded in mentor approval', error);
        }
    }


    async getAllmentorWithMergedUserData(params: ParamsData) {
        try {
            const { search, priceRange, experience, expertise, rating, location, page, limit } = params;


            const mentors = await this.mentorRepoistory.findAllWithUserData()
            const approvedMentors = mentors?.filter((mentor: { mentor: null; }) => mentor.mentor !== null)

            const slots = await this.slotRepository.findAll()
            const mentorsWithSlots = approvedMentors?.map((mentor: { mentor: { _id: { toString: () => string; }; }; toObject: () => any; }) => {
                const mentorSlots = slots.filter(slot => slot.mentorId.toString() === mentor.mentor._id.toString());

                return {
                    ...mentor.toObject(),
                    slots: mentorSlots
                }
            })
            console.log(mentorsWithSlots, 'mentors with slots');
            const filteredMentors = mentorsWithSlots?.filter((mentor: { mentor: IUser; singleSessionPrice: number; experience: any; location: string; }) => {
                if (typeof mentor.mentor !== 'string') {
                    const user = mentor.mentor as IUser;
                    const mentorSearch = !search || user.fullName.toLowerCase().includes(search.toLowerCase())
                    console.log(mentorSearch, 'mentorSearch');
                    const matchesPriceRange = !priceRange || mentor.singleSessionPrice <= priceRange;
                    console.log(matchesPriceRange, 'matchesprice range', priceRange, 'pricerange', mentor.singleSessionPrice, 'singlesesesionprice');
                    const matchesExperience = experience === 'any' ||
                        (experience === '1-3' && (mentor.experience ?? 0) >= 1 && (mentor.experience ?? 0) <= 3) ||
                        (experience === '4-7' && (mentor.experience ?? 0) >= 4 && (mentor.experience ?? 0) <= 7) ||
                        (experience === '8+' && (mentor.experience ?? 0) >= 8);

                    const matchesLocation = location === 'any' || mentor.location.toLowerCase().includes(location.toLowerCase())
                    console.log(matchesExperience, 'matchesExperience', matchesLocation, 'matchesLocation')

                    return (mentorSearch && matchesPriceRange && matchesExperience && matchesLocation)
                }

            })
            console.log(filteredMentors, 'filtered mentors')
            const totalResult = filteredMentors?.length || 0
            const pageSize = limit || 10
            const currentPage = page | 1
            const paginatedMentors = filteredMentors?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            return { data: paginatedMentors, pagination: { totalResult, totalPages: Math.ceil(totalResult / pageSize), currentPage } }
        } catch (error) {
            console.error('Error founded in getAllmentorWithMergedUserData service', error);
            throw error
        }
    }


    async getMentorSpecificData(id: string) {
        try {
            const mentor = await this.mentorRepoistory.findByIdWithBasicInfo(id)
            console.log(mentor, 'mentor in getMentorSpecificData')
            if (mentor?.mentor._id) {
                const mentorSlots = await this.slotRepository.findMentorSlots(mentor?.mentor._id.toString())
                console.log(mentorSlots, 'mentor slots')
                const mergedData = {
                    mentor,
                    slots: mentorSlots
                }
                console.log(mergedData, 'merged data');
                return mergedData

            }
        } catch (error) {
            console.error('Error founded in getMentorSpecificData service', error);
            throw error
        }
    }

}