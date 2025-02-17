import { z } from 'zod';
export const courseSchema = z.object({
  name: z.string().trim().min(1, { message: "Course name is required" }),
  duration: z.string().trim().min(1, { message: "Course duration is required" }),
  overview: z.string().trim().min(10, { message: "Course overview is required" }),
  curriculum: z.object({
    basic: z.string().trim().min(1, { message: "Basic curriculum topics are required" }),
    intermediate: z.string().trim().min(1, { message: "Intermediate curriculum topics are required" }),
    advanced: z.string().trim().min(1, { message: "Advanced curriculum topics are required" }),
  }),
  // price:z.number().min(1,{message:"Course price is required"}),
  price: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Course price must be a valid positive number" })
    .transform((val) => parseFloat(val)),

  image: z.union([
    z.any().refine((file) => file instanceof File, { message: "Course image must be a file" }),
    z.string().url({ message: "Course image must be a valid URL" }),
  ]),
})




// curriculum: z.object({
//   basic: z.array(z.string()).min(1, { message: "At least one basic topic is required" }),
//   intermediate: z.array(z.string()).min(1, { message: "At least one intermediate topic is required" }),
//   advanced: z.array(z.string()).min(1, { message: "At least one advanced topic is required" }),
// }),