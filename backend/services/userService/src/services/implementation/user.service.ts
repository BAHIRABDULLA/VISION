import { IMentor } from "../../interfaces/IMentor";
import { Mentor } from "../../models/mentor.model";
import { User } from "../../models/user.model";
import { MentorRepository } from "../../repositories/implementation/mentor.repository";
import { UserRepository } from "../../repositories/implementation/user.repository";
import IUserRepository from "../../repositories/interface/IUser.repository";
import { IUserService } from "../interface/IUser.service";

export class UserService implements IUserService{
    private userRepository: IUserRepository
    private mentorRepository:MentorRepository
    constructor(userRepository:IUserRepository,mentorRepository:MentorRepository) {
        this.userRepository = userRepository
        this.mentorRepository = mentorRepository
    }

    async getAllUsers() {
        try {
            return await this.userRepository.findAll()
        } catch (error) {
            console.error('Error founded in get all users',error);
        }
    }


    async getUser(id: string) {
        try {
            const user =  await this.userRepository.findById(id)
            console.log(user,'user, = = = = = = = ');
            
            if(user?.role==='mentor'){
                const mentorData = await this.mentorRepository.findMentor(id)
                console.log(mentorData,'this is mentordata ');
                const mergedData = {
                    ...user.toObject(),...mentorData?.toObject()
                }
                console.log(mergedData,'///////////////////');
                
                return mergedData
            }
            return user
        } catch (error) {
            console.error('Error founded in get user', error);
        }
    }

    async uploadMentorData(data:IMentor){
        try {
            const response = await this.mentorRepository.updateOrInsert(data._id.toString(),data)
            console.log(response,'response ');
            
            // await this.mentorRepository.create(data)
        } catch (error) {
            console.error('error fonded in upload mentor data',error);
        }
    }
    async updateUser(id:string,userData:{fullName:string,profile:string}){
        try {
            return await this.userRepository.update(id,userData)
        } catch (error) {
            console.error('Error founded in updating user',error);
            return null
        }
    }



}