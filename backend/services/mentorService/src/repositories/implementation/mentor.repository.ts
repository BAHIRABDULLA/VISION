import { IMentor } from "../../interface/IMentor";
import {  Mentor } from "../../model/mentor.model";
import { BaseRepository } from "./base.repository";



export class MentorRepository extends BaseRepository<IMentor> {


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
}