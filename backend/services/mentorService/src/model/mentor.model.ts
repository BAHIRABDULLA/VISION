import mongoose, { Schema, Types,Document } from "mongoose";

export interface IMentor extends Document {
    mentor:Types.ObjectId;
    // fullName: string;
    // email: string;
    jobTitle: string;
    location: string
    category: string
    company?: string;
    skills: string[];
    bio: string;
    socialMediaUrls?: string[];
    introductionVideoUrl?: string;
    featuredArticleUrl?: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
    profilePhoto: string;
    createdAt: Date;
    // status: 'pending' | 'approved' | 'rejected'
}

const mentorSchema = new Schema<IMentor>({
    
    mentor: {type:Schema.Types.ObjectId , ref:'User' ,required:true},
    jobTitle: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String },
    skills: { type: [String], required: true },
    bio: { type: String, required: true },
    socialMediaUrls: { type: [String], default: [] },
    introductionVideoUrl: { type: String},
    featuredArticleUrl: { type: String },
    whyBecomeMentor: { type: String },
    greatestAchievement: {type: String },
    profilePhoto: {type: String,default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'},
    createdAt: {type: Date,default: Date.now },
    // status: {type: String,enum: ['pending', 'approved', 'rejected'],default: 'pending' },
})

export const Mentor = mongoose.model('Mentor', mentorSchema);