import mongoose, { Schema} from "mongoose";
import { IMentor } from "../interfaces/IMentor";


const mentorSchema = new Schema<IMentor>({
    
    mentor: {type:Schema.Types.ObjectId , ref:'User' ,required:true},
    jobTitle: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String },
    experience : {type:Number},
    skills: { type: [String], required: true },
    bio: { type: String, required: true },
    socialMediaUrls: { 
        type:{
            github:{type:String,default:null},
            linkedin:{type:String,default:null},
            x:{type:String,default:null},
            portfolio:{type:String,default:null},
        },
        default:{}
     },
    introductionVideoUrl: { type: String},
    featuredArticleUrl: { type: String },
    whyBecomeMentor: { type: String },
    greatestAchievement: {type: String },
    profilePhoto: {type: String},
    createdAt: {type: Date,default: Date.now },
})

export const Mentor = mongoose.model('Mentor', mentorSchema);