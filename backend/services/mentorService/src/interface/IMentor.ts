
import { Types, Document } from 'mongoose'
import { IUser } from './IUser';

export interface IMentor extends Document {
    mentor: IUser| Types.ObjectId;
    jobTitle: string;
    category: string
    country:string
    location: string
    company?: string;
    experience:number;
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
    // profilePhoto: string;
    createdAt: Date;
    singleSessionPrice: number;
    monthlySubscriptionPrice: number
}

