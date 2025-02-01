import mongoose, { Types, Schema } from "mongoose";
import { IResource } from "../interfaces/IResource";


const resourceSchema = new Schema<IResource>({
    title: { type: String, required: true },
    type: { type: String, enum: ['text', 'video', 'image'], required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    level: { type: String, required: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
    status: {type:String,enum:['active','block'],required:true ,default:'active'},
    createAt: { type: Date, default: Date.now }
    // nextResourceId: { type:String,default:null },

})


export const Resource = mongoose.model<IResource>('Resource', resourceSchema)