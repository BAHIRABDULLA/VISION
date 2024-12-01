import { IMentor } from "../../interface/IMentor";
import {  Mentor } from "../../model/mentor.model";
import { IMentorRepository } from "../interface/IMentor.repository";
import { BaseRepository } from "./base.repository";



export class MentorRepository extends BaseRepository<IMentor> implements IMentorRepository {


    async findByEmail(email: string) {
        try {
            return await Mentor.findOne({ email })
        } catch (error) {
            console.error('Error founded in finding user via email', error);
        }
    }


    async findMentor(id: string) {
        try {
            return await Mentor.findOne({ mentor: id })
        } catch (error) {
            console.error('Error founded in find mentor repository', error);
        }
    }

    async findMentorAndUpdate(id:string,data:object){
        try {
            console.log(data,'data,data data in find mentro and update ');
            
            const resposne = await Mentor.findOneAndUpdate({mentor:id},{$set:data},{new:true})
            return resposne
        } catch (error) {
            console.error('Error founded in find mentor and update', error);
        }
    }


    async findAllWithUserData(){
        try {
            return await Mentor.find().populate({
                path:'mentor',
                match:{isApproved:'approved'}
            })
        } catch (error) {
            console.error('Error founded in find all with user data',error);
        }
    }
    async findByIdWithBasicInfo(id:string){
        try {
            const response = await Mentor.findById(id).populate('mentor')
            return response
        } catch (error) {
            console.error('Error founded in findByIdWithBasicInfo',error);
            
        }
    }
}