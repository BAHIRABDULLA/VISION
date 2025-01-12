import { IMentor } from "../../interface/IMentor";
import {  Mentor } from "../../model/mentor.model";
import { IMentorRepository, IPopulatedMentor } from "../interface/IMentor.repository";
import { BaseRepository } from "./base.repository";



export class MentorRepository extends BaseRepository<IMentor> implements IMentorRepository {


    async findByEmail(email: string) {
        try {
            return await Mentor.findOne({ email })
        } catch (error) {
            console.error('Error founded in finding user via email', error);
            throw error
        }
    }


    async findMentor(id: string) {
        try {
            return await Mentor.findOne({ mentor: id })
        } catch (error) {
            console.error('Error founded in find mentor repository', error);
            throw error
        }
    }

    async findMentorAndUpdate(id:string,data:object){
        try {
            console.log(data,'data,data data in find mentro and update ');
            
            const resposne = await Mentor.findOneAndUpdate({mentor:id},{$set:data},{new:true})
            return resposne
        } catch (error) {
            console.error('Error founded in find mentor and update', error);
            throw error
        }
    }


    async findAllWithUserData(): Promise<IPopulatedMentor[]> {
        try {
            const mentors = await Mentor.find().populate({
                path: 'mentor',
                match: { isApproved: 'approved' }
            }).exec();

            return mentors as IPopulatedMentor[];
        } catch (error) {
            console.error('Error found in find all with user data', error);
            throw error;
        }
    }
    async findByIdWithBasicInfo(id:string){
        try {
            const response = await Mentor.findById(id).populate('mentor')
            return response
        } catch (error) {
            console.error('Error founded in findByIdWithBasicInfo',error);
            throw error
        }
    }
}