import mongoose, { Types, Document } from "mongoose";


export interface IResource extends Document {
    title: string;
    subTitle: string
    type: 'text' | 'video' | 'image';
    course: Types.ObjectId;
    level: string;
    topic: string
    content: string;
    status: boolean
}