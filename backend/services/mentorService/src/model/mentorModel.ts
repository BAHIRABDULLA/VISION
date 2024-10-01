import mongoose, { Schema } from "mongoose";

interface IMentor {
    fullName: string;
    email: string;
    jobTitle: string;
    location: string
    category: string;
    company?: string;
    skills: string[];
    bio: string;
    socialMediaUrls?: string[];
    introductionVideoUrl?: string;
    featuredArticleUrl?: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
    profileImageUrl?: string;
    createdAt: Date;
    status: 'pending' | 'approved' | 'rejected'
}

const mentorSchema = new Schema<IMentor>({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    jobTitle: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String, default: null },
    skills: { type: [String], required: true },
    bio: { type: String, required: true },
    socialMediaUrls: { type: [String], default: [] },
    introductionVideoUrl: { type: String, default: null },
    featuredArticleUrl: { type: String, default: null },
    whyBecomeMentor: { type: String, required: true },
    greatestAchievement: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
})

module.exports = mongoose.model('Mentor', mentorSchema);