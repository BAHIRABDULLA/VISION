import { ICategory } from "../../models/category.model"


export interface IAdminService {
    login(email:string,password:string):Promise<{token?:string}| null>
    users():Promise<{users:object[]}| null>
    getUser(email:string):Promise<{user:object}|null>
    updateApproval(id:string,isApproved:string):Promise<null>
    updateUserStatus(id:string,isActive:boolean):Promise<any>


    getAllCategories():Promise<Partial<ICategory[]> | null>
    addNewCategory(category:string,skills:string[]):Promise<any>
    updateCategory(id:string,category:string,skills:string[]):Promise<ICategory | null>
}