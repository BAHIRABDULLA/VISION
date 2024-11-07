import {  z } from 'zod';
export const courseSchema = z.object({
  name:z.string().min(1,{message:"Course name is required"}),
  duration:z.string().min(1,{message:"Course duration is required"}),
  overview:z.string().min(1,{message:"Course overview is required"}),
  curriculum: z.object({
    basic: z.string().min(1, { message: "Basic curriculum topics are required" }),
    intermediate: z.string().min(1, { message: "Intermediate curriculum topics are required" }),
    advanced: z.string().min(1, { message: "Advanced curriculum topics are required" }),
  }),
  // price:z.number().min(1,{message:"Course price is required"}),
  price: z.string()
  .regex(/^\d+(\.\d{1,2})?$/, { message: "Course price must be a valid positive number" })
  .transform((val) => parseFloat(val)),

  image: z.instanceof(File).optional(),
})