import { IMentor } from "../../interface/IMentor"
import { IUser } from "../../interface/IUser";
import { mentorParamsData } from "../implementation/mentor.service";
export type socialMediaUrl= { 
    github?: string; 
    linkedin?: string; 
    x?: string; 
    portfolio?: string; 
}

export interface IMentorService {
    mentorDetails(email: string, jobTitle: string,country:string, location: string, category: string, experience:number,skills: string[], bio: string,
        whyBecomeMentor: string, greatestAchievement: string, company?: string, profilePhoto?: string, socialMediaUrls?:socialMediaUrl, introductionVideoUrl?: string, featuredArticleUrl?: string):Promise<IMentor | null>
    registerUser(userData:object):Promise< IUser | null>
    getAllMentors():Promise<IMentor[] | null>
    getMentor(id:string):Promise<IMentor | null>
    updateMentorData(id:string,data:IMentor):Promise<IMentor | null>
    updateSessionPrice(id:string,data:object):Promise<IMentor | null>
    mentorApproval(data:object):Promise<void>
    getAllmentorWithMergedUserData(params:mentorParamsData):Promise<any>
    getMentorSpecificData(id:string):Promise<any>
}