import {  z } from 'zod';
export const courseSchema = z.object({
  name:z.string().min(1,{message:"Course name is required"}),
  duration:z.string().min(1,{message:"Course duration is required"}),
  overview:z.string().min(1,{message:"Course overview is required"}),
  curriculum:z.string().min(1,{message:"Course curriculum ius required"}),
  price:z.string().min(1,{message:"Course price is required"})
})