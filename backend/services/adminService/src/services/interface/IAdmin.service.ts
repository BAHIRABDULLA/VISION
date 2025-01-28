import { ICategory } from "../../models/category.model"


export interface IAdminService {
    login(email: string, password: string): Promise<{ token?: string } | null>
    getDashboardData(token:string):Promise<any>

    users(): Promise<{ users: object[] } | null>
    getUser(email: string): Promise<{ user: object } | null>
    updateApproval(id: string, isApproved: string): Promise<null>
    updateUserStatus(id: string, isActive: boolean): Promise<{ isActive: boolean; }>


    getAllCategories(): Promise<Partial<ICategory[]> | null>
    addNewCategory(category: string, skills: string[]): Promise<ICategory | null>
    updateCategory(id: string, category: string, skills: string[]): Promise<ICategory | null>
}