import { ERROR_MESSAGES } from "../../constants/error.message";
import { USER_IMAGE } from "../../constants/user.role";
import { HttpStatus } from "../../enums/http.status";
import { sendUserData } from "../../events/rabbitmq/producers/producer";
import { IMentor } from "../../interfaces/IMentor";
import IUser from "../../interfaces/IUser";
import { User } from "../../models/user.model";
import { MentorRepository } from "../../repositories/implementation/mentor.repository";
import IUserRepository from "../../repositories/interface/IUser.repository";
import CustomError from "../../utils/custom.error";
import { sendEmail } from "../../utils/email.util";
import { generateDownloadPresignedUrl } from "../../utils/upload";
import { IUserService } from "../interface/IUser.service";

export class UserService implements IUserService {
    private userRepository: IUserRepository
    private mentorRepository: MentorRepository
    constructor(userRepository: IUserRepository, mentorRepository: MentorRepository) {
        this.userRepository = userRepository
        this.mentorRepository = mentorRepository
    }

    async getAllUsers() {
        try {
            return await this.userRepository.findAll()
        } catch (error) {
            console.error('Error founded in get all users', error);
            throw error
        }
    }


    async getUser(id: string) {
        try {
            const user = await this.userRepository.findById(id)
            if(!user){
                throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HttpStatus.NOTFOUND)
            }
            if(user?.profile&&user?.profile!==USER_IMAGE){
                const getImageUrl = await generateDownloadPresignedUrl(user?.profile)
                user.profile = getImageUrl
            }
            if (user?.role === 'mentor') {
                const mentorData = await this.mentorRepository.findMentor(id)
                const mergedData = {
                    ...user.toObject(), ...mentorData?.toObject()
                }
                return mergedData
            }
            return user
        } catch (error) {
            console.error('Error founded in get user', error);
            throw error
        }
    }

    async uploadMentorData(data: IMentor) {
        try {
            const response = await this.mentorRepository.updateOrInsert(data._id.toString(), data)
        } catch (error) {
            console.error('error fonded in upload mentor data', error);
            throw error
        }
    }
    async updateUser(id: string, userData: { fullName: string, profile: string }) {
        try {
            return await this.userRepository.update(id, userData)
        } catch (error) {
            console.error('Error founded in updating user', error);
            throw error
        }
    }


    async updateUserApproval({ id, isApproved
    }: { id: string, isApproved: "pending" | "approved" | "rejected" }): Promise<IUser | null> {
        try {
            if (!['pending', 'approved', 'rejected'].includes(isApproved)) {
                throw new CustomError("Invalid approval status", HttpStatus.BAD_REQUEST)
            }
            const updatedUser = await User.findByIdAndUpdate(
                id, { isApproved }, { new: true });

            if (!updatedUser) {
                throw new CustomError("User not founded", HttpStatus.BAD_REQUEST)
            }
            await sendUserData('mentorApproval', { id, isApproved })
            await sendEmail(updatedUser?.email,
                'Your Mentor Application is Approved!',
                `
                    <h1>Congratulations</h1>
                    <p>We are excited to inform you that your application to become a mentor on Vision has been approved.</p>
                    <p>You can now log in and start mentoring to make a difference in the lives of our mentees.</p>
                    <p>Thank you for joining Vision!</p>
                    <br>
                    <p>Best Regards,<br>The Vision Team</p>
                ` ,
                true
            )
            return updatedUser
        } catch (error) {
            console.error('Error founded in update user approval', error);
            throw error
        }
    }

    async getCountUserAndMentor() {
        try {
            const users= await this.userRepository.findAll()
            const userCount = users.filter(user => user.role === 'mentee').length
            const mentorCount = users.filter(user => (user.role === 'mentor'&& user.isApproved==='approved' ) ).length            
            return { userCount, mentorCount }
        } catch (error) {
            console.error('Error founded in get count of user and mentor', error);
            throw error
        }
    }


    async updateUserStatus(id: string, isActive: boolean) {
        try {
            const response = await this.userRepository.update(id, { isActive: isActive })
            if (!response) {
                throw new Error(`User with id ${id} not found`);
            }
            await sendUserData('userExchange', response)
            return response
        } catch (error) {
            console.error("Error founded in update user status", error);
            throw error
        }
    }


}
