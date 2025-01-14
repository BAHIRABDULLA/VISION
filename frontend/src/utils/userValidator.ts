
import { z } from 'zod'

export const common = z.object({
    fullName: z.string().min(1, { message: "Name cannot be empty" }),
    fileKey: z.optional(z.any()),
})
export type commonType = z.infer<typeof common>

export const mentorSchema = z.object({
    jobTitle: z.string().min(1, { message: "Job Title is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    company: z.string().optional(),
    // skills: z.array(z.string().min(1, { message: "Each skill must be at least 1 character long" })).nonempty({
    //     message: "At least one skill is required",
    // }),
    skills: z.string().min(1, { message: "Skills are required" }),

    bio: z.string().min(1, { message: "Bio is required" }),
    socialMediaUrls: z.object({
        github: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Github URL" }).optional()),
        linkedin: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Linkedin URL" }).optional()),
        x: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid X URL" }).optional()),
        portfolio: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Portfolio URL" }).optional()),
    }),
    introductionVideoUrl: z.string().optional(),
    featuredArticleUrl: z.string().optional(),
    whyBecomeMentor: z.string().min(1, { message: "Why become mentor is required" }),
    greatestAchievement: z.string().min(1, { message: "Greatest achievement is required" }),
    _id: z.any()
})

export type mentorSchemaType = z.infer<typeof mentorSchema>

export const userSchema = z.object({
    fullName: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),

    file: z.optional(z.any()),
    jobTitle: z.string().min(1, { message: "Job Title is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    company: z.string().optional(),
    // skills: z.array(z.string().min(1, { message: "Each skill must be at least 1 character long" })).nonempty({
    //     message: "At least one skill is required",
    // }),
    skills: z.string().min(1, { message: "Skills are required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
    socialMediaUrls: z.object({
        github: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Github URL" }).optional()),
        linkedin: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Linkedin URL" }).optional()),
        x: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid X URL" }).optional()),
        portfolio: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Portfolio URL" }).optional()),
    }),
    introductionVideoUrl: z.string().optional(),
    featuredArticleUrl: z.string().optional(),
    whyBecomeMentor: z.string().min(1, { message: "Why become mentor is required" }),
    greatestAchievement: z.string().min(1, { message: "Greatest achievement is required" }),
    role: z.enum(['mentee', 'mentor']),
    _id: z.any()

})

export type userSchemaType = z.infer<typeof userSchema>