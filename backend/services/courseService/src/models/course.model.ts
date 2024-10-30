

import mongoose from "mongoose";
import ICourse from "../interfaces/ICourse";

const courseSchema = new mongoose.Schema<ICourse>({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    overview: { type: String, required: true },
    curriculum: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    createAt: { type: Date, default: Date.now() },
    isActive: { type: Boolean, required: true, default: true },
})

export const Course = mongoose.model('Course', courseSchema)