import IUser from "../../interface/IUser";
// import { ICategory } from "../../models/category.model"


interface ParamsData {
    search: string;
    page: number;
    limit: number
}

export interface IAdminService {
    login(email: string, password: string): Promise<{ token?: string } | null>
    getDashboardData(token: string): Promise<any>

    users(): Promise<{users:IUser[]} | null>
    getUser(email: string): Promise<{ user: object } | null>
    updateApproval(id: string, isApproved: string): Promise<null>
    updateUserStatus(id: string, isActive: boolean): Promise<{ isActive: boolean; }>

    getAllUsersWithQueryResponse(params: ParamsData): Promise<any>

}