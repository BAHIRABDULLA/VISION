import mongoose,{Schema} from "mongoose";
import ICourse from "../interfaces/ICourse";

const curriculumSchema = new Schema({
    level: {
        type: String,
        required: true,
        enum: ['Basic', 'Intermediate', 'Advanced']
    },
    topics: {
        type: [String],
        required: true
    }
})

const courseSchema = new mongoose.Schema<ICourse>({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    overview: { type: String, required: true },
    curriculum: { type: [curriculumSchema], required: true },
    price: { type: Number, required: true },
    image: { type: String },
    createAt: { type: Date, default: Date.now() },
    isActive: { type: Boolean, required: true, default: true },
})

export const Course = mongoose.model('Course', courseSchema)