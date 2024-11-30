import { IMentor } from "../../interface/IMentor"
export type socialMediaUrl= { 
    github?: string; 
    linkedin?: string; 
    x?: string; 
    portfolio?: string; 
}

export interface IMentorService {
    mentorDetails(email: string, jobTitle: string, location: string, category: string, skills: string[], bio: string,
        whyBecomeMentor: string, greatestAchievement: string, company?: string, profilePhoto?: any, socialMediaUrls?:socialMediaUrl, introductionVideoUrl?: string, featuredArticleUrl?: string):Promise<any>
    registerMentor(mentorData:object):Promise<any>
    getAllMentors():Promise<any>
    getMentor(id:string):Promise<any>
    updateMentorData(id:string,data:IMentor):Promise<any>
    updateSessionPrice(id:string,data:object):Promise<any>
    mentorApproval(data:object):Promise<any>
    getAllmentorWithMergedUserData(params:any):Promise<any>
    getMentorSpecificData(id:string):Promise<any>
}