import bcrypt from 'bcryptjs'
import { inject, injectable } from 'inversify'
import axios from 'axios'
import { AdminRepository } from "../../repositories/implementation/admin.repository"
import { TYPES } from '../../types'
import { generateAccessToken } from '../../utils/token'
import { IAdminService } from '../interface/IAdmin.service'
import { IAdminRepository } from '../../repositories/interface/IAdmin.repository'
import { ICategoryRepository } from '../../repositories/interface/ICategory.repository'
import CustomError from '../../utils/custom.error'
import { HttpStatus } from '../../enums/http.status'
import { publishMessage } from '../../events/rabbitmq/producer'

console.log(process.env.API_BASE_URL,'in admin service API_BASE_URL');



const userApi = axios.create({
    baseURL: `${process.env.API_BASE_URL}/user`,
    
})
const mentorApi = axios.create({
    baseURL: `${process.env.API_BASE_URL}/mentor`
})

@injectable()
export class AdminService implements IAdminService {
    private adminRepository: IAdminRepository;
    private categoryRepository: ICategoryRepository
    constructor(
        @inject(TYPES.AdminRepository) adminRepository: IAdminRepository,
        @inject(TYPES.CategoryRepository) categoryRepository: ICategoryRepository
    ) {
        this.adminRepository = adminRepository
        this.categoryRepository = categoryRepository
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
            // return successResponse("Login successful", { token:getAccessToken })
            return { token }
        } catch (error) {
            console.error('Error founded in admin login', error);
            return null
        }
    }


    async getDashboardData(){
        try {
            const fetchTotalUsers = await axios.get('/')
        } catch (error) {
            console.error();
            throw error
        }
    }

    async users(): Promise<{ users: object[] } | null> {
        try {
            const users = await userApi.get('/users')
            // const usersFromMentorService = await mentorApi.get('/mentors')

            let userData = users.data

            // let dataFromMentorService = usersFromMentorService.data

            // const mergedUsers = dataFromUserService.map((x: any) => {
            //     const findMentor = dataFromMentorService.find((y: { mentor: any }) => y.mentor === x._id);
            //     return findMentor ? { ...x, ...findMentor } : x;
            // });

            // return { users: mergedUsers };
            return { users: userData }
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

            if (commonData.data.role === 'mentor' && commonData.data.isMentorFormFilled === true) {
                const mentorData = await mentorApi.get(`/users/${id}`)

                const mergedData = {
                    ...commonData.data,
                    mentorDetails: mentorData.data.mentor
                }
          
                return { user: mergedData }
            }
            return { user: commonData.data }
        } catch (error) {
            console.error('Error founded in get user in mentor service', error);
            return null
        }
    }

    async updateApproval(id: string, isApproved: string) {
        try {

            // await publishMessage({id,isApproved})
            const sentRequestToUserService = await userApi.patch(`${id}/approval`, { isApproved })


            return sentRequestToUserService.data
        } catch (error) {
            console.error('Error founded in udpated approval adminservice', error);
        }
    }


    async updateUserStatus(id: string, isActive: boolean) {
        try {
            const sentRequestToUserService = await userApi.patch(`${id}/status`, { isActive })
            return sentRequestToUserService.data
        } catch (error) {
            console.error('ERror founded in update user status', error);
        }
    }


    async getAllCategories(){
        try {
            const response = await this.categoryRepository.findAll()
            return response
        } catch (error) {
            console.error('Error founded in get all categories in service',error);
            throw error
        }
    }


    async addNewCategory(category: string, skills: string[]) {
        try {
            const findExistingCategory = await this.categoryRepository.findByCategoryName(category)
            if(findExistingCategory){
                throw new CustomError('Category already exited',HttpStatus.FORBIDDEN)
            }
            const data = {
                name:category,
                skills
            }
            const response = await this.categoryRepository.create(data)
            await publishMessage('category_exchange',response)
            if(!response){
                throw new CustomError('Unexpected error occuring to create category',HttpStatus.FORBIDDEN)
            }
            return response
        } catch (error) {
            console.error('Error founded in add new category in service', error);
            throw error
        }
    }

    async updateCategory(id:string,category:string,skills:string[]){
        try {

            const findCategory = await this.categoryRepository.findById(id)
            if(!findCategory){
                throw new CustomError('Category not founded',HttpStatus.NOTFOUND)
            }
            const response = await this.categoryRepository.update(id,{name:category,skills})
            console.log(response,'response in update category');
            
            await publishMessage('category_exchange',response!)
            return response
        } catch (error) {
            console.error('Error founded in update category',error);
            throw error
        }
    }

    // async registerUser(data: any) {
    //     try {

    //     } catch (error) {

    //     }
    // }
}