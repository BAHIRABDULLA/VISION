import bcrypt from 'bcryptjs'
import { AdminRepository } from "../repositories/admin.repository"
import axios from 'axios'
import jwt from 'jsonwebtoken'

const adminRepository = new AdminRepository()

const userApi = axios.create({
    baseURL: 'http://localhost:4001/'
})
const mentorApi = axios.create({
    baseURL: 'http://localhost:4002/'
})


export class AdminService {


    async login(email: string, password: string) {
        try {
            const admin = await adminRepository.findByEmail(email)
            if (!admin) {
                return { success: false, message: "Admin not existed" }
            }

            const passwordCheck = await bcrypt.compare(password, admin.password)
            if (!passwordCheck) {
                return { success: false, message: "Invalid credentials, please try again " }
            }
            const SECRET_KEY = process.env.TOKEN_SECRET_KEY!

            const token = jwt.sign(
                { id: admin.id, email: admin.email },
                SECRET_KEY,
                { expiresIn: '1h' }
            );
            return { success: true, message: "Login successfully done", token }
        } catch (error) {
            console.error('Error founded in admin login', error);
        }
    }


    async users() {
        try {
            const usersFromUsers = await userApi.get('/users')
            const usersFromMentors = await mentorApi.get('/mentors')

            let dataFromUsers = usersFromUsers.data
            let dataFromMentors = usersFromMentors.data

            const users = dataFromUsers.map((x: any) => {

                let findMentor = dataFromMentors.find((y: { mentor: any }) => y.mentor == x._id)
                if (findMentor) {
                    return {
                        ...x, ...findMentor
                    }
                }
                return x
            })
            return { users }
        } catch (error) {
            console.error('Error founding on find users', error);
        }
    }

    
    async getUser(id: string) {
        try {
            const commonData = await userApi.get(`/users/${id}`)
            if (commonData.data.role === 'mentor') {
                const mentorData = await mentorApi.get(`/users/${id}`)

                const mergedData = {
                    ...commonData.data,
                    mentorDetails: mentorData.data.mentor
                }
                return { success: true, user: mergedData };
            }
            return { success: true, user: commonData.data }

        } catch (error) {
            console.error('Error founded in get user in mentor service', error);
        }
    }
}