import axios from "axios";
import { HttpStatus } from "../../enums/http.status";
import { IUserRepository } from "../../repositories/interface/IUser.repository";
import CustomError from "../../utils/custom.error";
import { IUserService } from "../interface/IUser.service";


const mentorApi = axios.create({
    baseURL: 'https://apivision.bahirabdulla.online/mentor'
})



export class UserService implements IUserService{
    constructor(private userRepository:IUserRepository){}

    async saveUserData(data:object){
        try {
            await this.userRepository.create(data)
        } catch (error) {
            console.error('Error founded in save user data',error);
        }
    }

    async getAllUsers(userId:string,token:string){
        try {
            
            if(!userId || userId =='undefined'){
                throw new CustomError('Cannot found users',HttpStatus.NOTFOUND)  
            }
            const checkUser = await this.userRepository.findById(userId)
            const role = checkUser?.role
            if(!checkUser){
                throw new CustomError("Cannot found users",HttpStatus.NOTFOUND)
            }
            const getBookUsers =await mentorApi.get('/slots/booking',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const getChatUsers =  getBookUsers.data.bookings.filter((x:{mentorId:string,
                menteeId:string,date:Date,time:string,sessions:number,
            })=>{
                return role==='mentee'?x.menteeId==userId:x.mentorId==userId
            })
            const uniqueUsers = getChatUsers.reduce((acc: any[],curr: { mentorId: { _id: any; }; })=>{
                if(!acc.some((user:any)=>user.mentorId._id== curr.mentorId._id)){
                    acc.push(curr)
                }
                return acc
            },[])
            // let role = checkUser.role
            
            // const response  = await this.userRepository.findUsersWithRole(role)
            
            // if(response&&response.length<1){
                
            //     throw new CustomError('Cannot find users',HttpStatus.NOTFOUND)
            // }
            return uniqueUsers
        } catch (error) {
            console.error('Error founded in get all users in service',error);
            throw error
        }
    }
}