export interface CommonDetails {
    fullName: string;
    email: string;
    id: string;
    role: 'mentor' | 'mentee';
    isVerified: boolean;
    accountCreated: string;
    isActive: boolean;
    isApproved: string;

    profilePictureUrl?: string;
}

export interface MenteeDetails extends CommonDetails {
    courses?: string[];
    mentors?: string[];
}
export interface MentorDetails extends CommonDetails {
    mentorDetails: any;
    jobTitle: string;
    category: string;
    company: string;
    location: string;
    skills: string[];
    socialMediaUrls: { [key: string]: string };
    introVideoUrl: string;
    featuredArticleUrl: string;
    bio: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
}