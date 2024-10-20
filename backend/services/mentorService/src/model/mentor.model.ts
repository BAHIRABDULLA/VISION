import mongoose, { Schema} from "mongoose";
import { IMentor } from "../interface/IMentor";


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
    profilePhoto: {type: String},
    createdAt: {type: Date,default: Date.now },
    // status: {type: String,enum: ['pending', 'approved', 'rejected'],default: 'pending' },
})

export const Mentor = mongoose.model('Mentor', mentorSchema);