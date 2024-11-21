
import { Document } from "mongoose"
export interface ICurriculum {
    level: 'Basic' | 'Intermediate' | 'Advanced';
    topics: string[];
}

interface ICourse extends Document {
    name: string;
    duration: string;
    overview: string;
    curriculum: ICurriculum[];
    price: number;
    image: string,
    createAt: Date;
    // isActive: boolean;
    status:'active'|'block'
}

export default ICourse