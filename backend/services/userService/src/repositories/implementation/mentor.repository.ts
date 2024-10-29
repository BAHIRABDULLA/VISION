import { IMentor } from "../../interfaces/IMentor";
import { Mentor } from "../../models/mentor.model";
import BaseRepository from "./base.repository";


export class MentorRepository extends BaseRepository<IMentor> {
    async findMentor(id:string){
        return await Mentor.findOne({mentor:id})
    }

    async updateOrInsert(id:string,data:object){
        return await Mentor.updateOne(
            {_id:id},{$set:data},{upsert:true}
        )
    }
}