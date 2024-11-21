

export interface IAdminService {
    login(email:string,password:string):Promise<{token?:string}| null>
    users():Promise<{users:object[]}| null>
    getUser(email:string):Promise<{user:object}|null>
    updateApproval(id:string,isApproved:string):Promise<null>
}