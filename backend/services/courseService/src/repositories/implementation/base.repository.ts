import { IBaseRepository } from "../interface/IBase.repository";
import { Model,Document } from "mongoose";

export class BaseRepository<T extends Document>  implements IBaseRepository<T>{
    protected model:Model<T>

    constructor(model:Model<T>){
        this.model = model
    }
    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data)
    }
    async findAll(): Promise<T[]> {
        return this.model.find()
    }
    async findById(id: string): Promise<T | null> {
        return this.model.findById(id)
    }
    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id,data,{new:true})
    }
    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id)
    }
}