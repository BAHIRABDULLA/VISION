import { IMentor } from "../../interface/IMentor";
import { Mentor } from "../../model/mentor.model";
import { IMentorRepository, IPopulatedMentor } from "../interface/IMentor.repository";
import { BaseRepository } from "./base.repository";



export class MentorRepository extends BaseRepository<IMentor> implements IMentorRepository {


    async findByEmail(email: string) {
        try {
            return await Mentor.findOne({ email })
        } catch (error) {
            throw error
        }
    }


    async findMentor(id: string) {
        try {
            return await Mentor.findOne({ mentor: id })
        } catch (error) {
            throw error
        }
    }

    async findMentorAndUpdate(id: string, data: object) {
        try {

            const resposne = await Mentor.findOneAndUpdate({ mentor: id }, { $set: data }, { new: true })
            return resposne
        } catch (error) {
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
            throw error;
        }
    }
    async findByIdWithBasicInfo(id: string) {
        try {
            const response = await Mentor.findById(id).populate('mentor')
            return response
        } catch (error) {
            throw error
        }
    }
}