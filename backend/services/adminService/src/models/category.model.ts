import mongoose, { Document } from "mongoose";
import { ICategory } from "../interface/ICategory";


const categorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true },
    skills: [{
        type: String,
        required: true,
        // unique:true
    }],
    status: { type: String, enum: ['active', 'block'], default: 'active' }
})

const Category = mongoose.model<ICategory>('Category', categorySchema)
export default Category