
import { Document } from "mongoose"
interface ICourse extends Document {
    name: string;
    duration: string;
    overview: string;
    curriculum: string;
    price: number;
    image?: string,
    createAt: Date;
    isActive: boolean;
}

export default ICourse