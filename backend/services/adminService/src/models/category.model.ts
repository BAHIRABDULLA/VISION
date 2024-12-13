import mongoose,{Document} from "mongoose";

export interface ICategory  extends Document{
    name:string,
    skills:string[]
}

const categorySchema = new mongoose.Schema<ICategory>({
    name:{type:String,required:true},
    skills:[{
        type:String,
        required:true,
        // unique:true
    }]
})

const Category = mongoose.model<ICategory>('Category',categorySchema)
export default Category