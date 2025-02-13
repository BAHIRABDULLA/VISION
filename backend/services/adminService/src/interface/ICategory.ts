import  { Document } from "mongoose";

export interface ICategory extends Document {
    name: string,
    skills: string[]
    status: 'active' | 'block'
}