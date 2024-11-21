
import {Types,Document} from 'mongoose'

export interface IMentor extends Document {
    _id:Types.ObjectId
    mentor:Types.ObjectId;
    jobTitle: string;
    location: string
    category: string
    company?: string;
    experience?:number;
    skills: string[];
    bio: string;
    socialMediaUrls?: {
        github?:string;
        linkedin?:string;
        x?:string;
        portfolio?:string
    }
    introductionVideoUrl?: string;
    featuredArticleUrl?: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
    profilePhoto: string;
    createdAt: Date;
}

