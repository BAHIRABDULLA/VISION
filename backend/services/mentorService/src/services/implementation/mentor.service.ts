import { HttpStatus } from "../../enums/http.status";
import { sendMentorData } from "../../events/rabbitmq/publisher";
import axios from "axios";
import CustomError from "../../utils/custom.error";
import { IUser } from "../../interface/IUser";
import { IMentor } from "../../interface/IMentor";
import mongoose, { ObjectId } from 'mongoose'
import { IMentorService, socialMediaUrl } from "../interface/IMentor.service";
import { IMentorRepository, IPopulatedMentor } from "../../repositories/interface/IMentor.repository";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import { ISlotRepository } from "../../repositories/interface/ISlot.repository";
import { IBookingRepository } from "../../repositories/interface/IBooking.repository";
import { ICategoryRepository } from "../../repositories/interface/ICategory.repository";
import { ICategory } from "../../model/category.model";
import { ERROR_MESSAGES, USER_IMAGE } from "../../constants";
import { generateDownloadPresignedUrl } from "../../utils/upload";


export interface mentorParamsData {
    search: string;
    priceRange: number;
    experience: string;
    expertise: string;
    rating: number;
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
    private bookingRepository: IBookingRepository
    private categoryRepository: ICategoryRepository
    constructor(mentorRepository: IMentorRepository, userRepository: IUserRepository, slotRepository: ISlotRepository,
        bookingRepository: IBookingRepository, categoryRepository: ICategoryRepository) {
        this.mentorRepoistory = mentorRepository
        this.userRepository = userRepository
        this.slotRepository = slotRepository
        this.bookingRepository = bookingRepository
        this.categoryRepository = categoryRepository
    }


    async mentorDetails(email: string, jobTitle: string, country: string, location: string, category: string, experience: number, skills: string[], bio: string,
        whyBecomeMentor: string, greatestAchievement: string, company?: string, file?: string, socialMediaUrls?: socialMediaUrl, introductionVideoUrl?: string, featuredArticleUrl?: string,) {
        try {
            const checkUser = await this.userRepository.isMentor(email)
            if (!checkUser) {
                throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED)
            }

            const mentorData = {
                mentor: checkUser._id,
                jobTitle, country, location, category, company, experience, skills, bio, socialMediaUrls,
                introductionVideoUrl, featuredArticleUrl, whyBecomeMentor,
                greatestAchievement
            }

            const newMentor = await this.mentorRepoistory.create(mentorData);

            const data = {
                id: newMentor.mentor
            }

            if (file == '') {
                file = USER_IMAGE
            }
            await this.userRepository.update(checkUser._id.toString(), { isMentorFormFilled: true, profile: file })
            await sendMentorData(newMentor.toObject(), file)

            if (!newMentor) {
                throw new CustomError("Mentor details not updated", HttpStatus.UNAUTHORIZED)
            }

            return newMentor
        } catch (error) {
            throw error
        }
    }


    async registerUser(userData: object) {
        try {
            // const mentor = this.userRepository.create(userData)
            const mentor = await this.userRepository.findByIdAndUpdate(userData)
            if (!mentor) {
                throw new CustomError(ERROR_MESSAGES.ERROR_UPDAING_MENTOR, HttpStatus.UNAUTHORIZED)
            }
            return mentor
        } catch (error) {
            throw error
        }
    }
    async getAllMentorsWithPopulatedData() {
        try {
            const mentors = await this.mentorRepoistory.findAllWithUserData()
            if (!mentors) {
                return []
            }
            await Promise.all(mentors.map(async (mentor) => {
                if (mentor?.mentor?.profile && mentor?.mentor?.profile !== USER_IMAGE) {
                    const getImageUrl = await generateDownloadPresignedUrl(mentor?.mentor?.profile)
                    mentor.mentor.profile = getImageUrl
                }
            })
            )
            return mentors
        } catch (error) {
            throw error
        }
    }

    async getAllMentors() {
        try {
            const mentors = await this.mentorRepoistory.findAll()
            return mentors
        } catch (error) {
            throw error
        }
    }


    async getMentor(id: string) {
        try {
            const findMentor = await this.mentorRepoistory.findMentor(id)
            return findMentor
        } catch (error) {
            throw error
        }
    }

    async updateMentorData(id: string, data: IMentor) {
        try {
            const findUser = await this.userRepository.findById(id)
            if (findUser) {
                data.mentor = new mongoose.Types.ObjectId(id)
                const newMentor = await this.mentorRepoistory.create(data)
                if (!newMentor) {
                    throw new CustomError(ERROR_MESSAGES.ERROR_UPDAING_MENTOR, HttpStatus.UNAUTHORIZED)
                }
                await sendMentorData(newMentor.toObject())
                await this.userRepository.update(id, { isMentorFormFilled: true })
                return newMentor

            } else {
                const updatingMentor = await this.mentorRepoistory.update(id, data)
                if (!updatingMentor) {
                    throw new CustomError(ERROR_MESSAGES.ERROR_UPDAING_MENTOR, HttpStatus.UNAUTHORIZED)
                }
                await sendMentorData(updatingMentor.toObject())
                await this.userRepository.update(updatingMentor.mentor.toString(), { isMentorFormFilled: true })
                // return { success: true, message: "Mentor details is updated" }
                return updatingMentor
            }
        } catch (error) {
            throw error
        }
    }

    async updateSessionPrice(id: string, data: { singleSessionPrice: number, monthlySubscriptionPrice: number }) {
        try {
            const { singleSessionPrice, monthlySubscriptionPrice } = data
            if ((singleSessionPrice || monthlySubscriptionPrice) < 50) {
                throw new CustomError("session price must be at least ₹ 50 to meet minimum requirement", HttpStatus.UNAUTHORIZED)
            }
            const findMentorFormFilled = await this.userRepository.findById(id)

            if (!findMentorFormFilled) {
                throw new CustomError('Please complete profile section', HttpStatus.NOT_FOUND)
            }
            if (findMentorFormFilled.isApproved === 'pending' || findMentorFormFilled.isApproved === 'rejected') {
                throw new CustomError("Mentorship not approved", HttpStatus.BAD_REQUEST)
            }
            const response = await this.mentorRepoistory.findMentorAndUpdate(id, data)
            return response
        } catch (error) {
            throw error
        }
    }



    async mentorApproval(data: { id: string, isApproved: 'approved' | 'rejected' | 'pending' }) {
        try {
            const { id, isApproved } = data
            await this.userRepository.update(id, { isApproved })
        } catch (error) {
            console.error(ERROR_MESSAGES.ERROR_FOUND_APPROVE_MENTOR, error);
        }
    }


    async getAllmentorWithMergedUserData(params: mentorParamsData) {
        try {
            const { search, priceRange, experience, expertise, rating, page, limit } = params;


            const mentors = await this.mentorRepoistory.findAllWithUserData() ?? []
            const approvedMentors = mentors?.filter((mentor: IPopulatedMentor) => mentor.mentor !== null)
            await Promise.all(approvedMentors.map(async (mentor) => {
                if (mentor?.mentor?.profile && mentor?.mentor?.profile !== USER_IMAGE) {
                    const getImageUrl = await generateDownloadPresignedUrl(mentor?.mentor?.profile)
                    mentor.mentor.profile = getImageUrl
                }
            })
            )
            const findAllCategories = await this.categoryRepository.findAll()

            const categoryNames = findAllCategories.map((category) => category.name)

            const slots = await this.slotRepository.findAll()
            const mentorsWithSlots = approvedMentors?.map((mentor: { mentor: { _id: { toString: () => string; }; }; toObject: () => any; }) => {
                const mentorSlots = slots.filter(slot => slot.mentorId.toString() === mentor.mentor._id.toString());

                return {
                    ...mentor.toObject(),
                    slots: mentorSlots
                }
            })

            const filteredMentors = mentorsWithSlots?.filter((mentor: { mentor: IUser; category: string, singleSessionPrice: number; experience: number; location: string; }) => {
                if (typeof mentor.mentor !== 'string') {
                    const user = mentor.mentor as IUser;
                    const mentorSearch = !search || user.fullName.toLowerCase().includes(search.toLowerCase())
                    const matchesPriceRange = !priceRange || mentor.singleSessionPrice <= priceRange;
                    const matchesExperience = experience === 'any' ||
                        (experience === '1-3' && (mentor.experience ?? 0) >= 1 && (mentor.experience ?? 0) <= 3) ||
                        (experience === '4-7' && (mentor.experience ?? 0) >= 4 && (mentor.experience ?? 0) <= 7) ||
                        (experience === '8+' && (mentor.experience ?? 0) >= 8);
                    const mathesExpertise = expertise === 'any' || categoryNames.includes(expertise) && mentor.category === expertise

                    return (mentorSearch && matchesPriceRange && matchesExperience && mathesExpertise )
                }

            })

            const totalResult = filteredMentors?.length || 0
            const pageSize = limit || 10
            const currentPage = page | 1
            const paginatedMentors = filteredMentors?.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            return { data: paginatedMentors, pagination: { totalResult, totalPages: Math.ceil(totalResult / pageSize), currentPage } }
        } catch (error) {
            throw error
        }
    }


    async getMentorSpecificData(id: string) {
        try {
            const mentor = await this.mentorRepoistory.findByIdWithBasicInfo(id)

            if (mentor?.mentor._id) {
                const mentorSlots = await this.slotRepository.findMentorSlots(mentor?.mentor._id.toString())
                const bookingData = await this.bookingRepository.findBookingDataWithMentorId(mentor?.mentor._id.toString())
                const mergedData = {
                    mentor,
                    slots: mentorSlots,
                    bookingData
                }

                return mergedData

            }
        } catch (error) {
            throw error
        }
    }


    async addCategory(data: ICategory) {
        try {
            await this.categoryRepository.findOneAndUpdate(data)
        } catch (error) {
            throw error
        }
    }

    async getAllCategoris() {
        try {
            const response = await this.categoryRepository.findAll()
            console.log(response,'response ');
            
            const activeCategories = response.filter(cat=>cat.status==='active')
            console.log('------',activeCategories,'active categories');
            
            return activeCategories
        } catch (error) {
            throw error
        }
    }

}