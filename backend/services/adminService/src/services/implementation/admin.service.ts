import bcrypt from 'bcryptjs'
import { inject, injectable } from 'inversify'
import axios from 'axios'
import { AdminRepository } from "../../repositories/implementation/admin.repository"
import { TYPES } from '../../types'
import {  generateAccessToken } from '../../utils/token'
import { IAdminService } from '../interface/IAdmin.service'
import { IAdminRepository } from '../../repositories/interface/IAdmin.repository'



const userApi = axios.create({
    baseURL: 'http://localhost:4001/'
})
const mentorApi = axios.create({
    baseURL: 'http://localhost:4002/'
})

@injectable()
export class AdminService implements IAdminService {
    private adminRepository: IAdminRepository;
    constructor(@inject(TYPES.AdminRepository) adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository
    }

    async login(email: string, password: string): Promise<{ token: string } | null> {
        try {
            const admin = await this.adminRepository.findByEmail(email)
            
            if (!admin) return null
            // return errorResponse('Admin not found')

            const passwordCheck = await bcrypt.compare(password, admin.password);
            
            if (!passwordCheck) return null
            // return errorResponse("Invalid credentials, Please try again")
            const token = generateAccessToken(email)
            console.log(token,'token token token ');
            
            // return successResponse("Login successful", { token:getAccessToken })
            return { token }
        } catch (error) {
            console.error('Error founded in admin login', error);
            return null
        }
    }


    async users(): Promise<{ users: object[] } | null> {
        try {
            const usersFromUserService = await userApi.get('/users')
            const usersFromMentorService = await mentorApi.get('/mentors')

            let dataFromUserService = usersFromUserService.data
            let dataFromMentorService = usersFromMentorService.data
            const mergedUsers = dataFromUserService.map((x: any) => {
                const findMentor = dataFromMentorService.find((y: { mentor: any }) => y.mentor === x._id);
                return findMentor ? { ...x, ...findMentor } : x;
            });
    
            return { users: mergedUsers };
        } catch (error) {
            console.error('Error founding on find users', error);
            return null
        }
    }


    async getUser(id: string): Promise<{ user: object } | null> {
        try {
            const commonData = await userApi.get(`/users/${id}`)
            if (!commonData) {
                return null
            }
            if (commonData.data.role === 'mentor') {
                const mentorData = await mentorApi.get(`/users/${id}`)

                const mergedData = {
                    ...commonData.data,
                    mentorDetails: mentorData.data.mentor
                }
                console.log(mergedData, 'merged data');
                return { user: mergedData }
            }
            return { user: commonData.data }
        } catch (error) {
            console.error('Error founded in get user in mentor service', error);
            return null
        }
    }



    // async registerUser(data: any) {
    //     try {

    //     } catch (error) {

    //     }
    // }
}