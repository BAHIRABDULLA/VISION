import mongoose,{Document} from "mongoose";

export interface ICategory  extends Document{
    name:string,
    skills:string[],
    status: 'active' | 'block'
}

const categorySchema = new mongoose.Schema<ICategory>({
    name:{type:String,required:true},
    skills:[{
        type:String,
        required:true,
        // unique:true
    }],
    status: { type: String, enum: ['active', 'block'], default: 'active' }
})

const Category = mongoose.model<ICategory>('Category',categorySchema)
export default Category