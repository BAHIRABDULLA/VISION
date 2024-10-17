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

// export const adminService={
//     login:async(email:string,password:string)=>{
//         const admin= await adminRepository.findByEmail(email)
//         if(!admin){
//             return {success:false, message:"Admin not existed"}
//         }
//         const passwordCheck =await bcrypt.compare(password,admin.password)
//         console.log(passwordCheck,'password check ');

//         if(!passwordCheck){
//             return {success:false,message:"Invalid credentials, please try again "}
//         }
//         return {success:true,message:"Login successfully done"}
//     },
//     users:async()=>{
//         try {
//             const usersFromUsers = await userApi.get('/users')
//             // console.log(usersFromUsers.data,'usersFrm User s');
//             const usersFromMentors = await mentorApi.get('/mentors')
//             // console.log(usersFromMentors.data,'users from mentors ');

//             let k = usersFromUsers.data
//             let m = usersFromMentors.data
//             // for(let i = 0;i<k.length;i++){
//             //     let user = k[i]
//             //     let isFound = false
//             //     for(let j = 0;j<m.length;j++){
//             //         console.log(user._id,'m[i] * * * * * * * * *',m[j].mentor);

//             //         if(k[i]._id==m[j].mentor){
//             //             users.push({...k[i],...m[j]})
//             //             isFound = true
//             //             break
//             //         }
//             //     }
//             //     console.log(isFound,'is found true or false ');

//             //     if(!isFound){
//             //         users.push(user)
//             //     }
//             // }

//             const users = k.map((x:any)=>{

//                 let findMentor = m.find((y: { mentor: any })=>y.mentor==x._id)
//                 if(findMentor){
//                     return {
//                         ...x,...findMentor
//                     }
//                 }
//                 return x
//             })
//             // console.log(users,'  -  - - - - - - - - - - -');
//             return {users}
//         } catch (error) {
//             console.error('Error founding on find users',error);
//         }
//     }
// }

export class AdminService {
    async login(email: string, password: string) {
        const admin = await adminRepository.findByEmail(email)
        if (!admin) {

            return { success: false, message: "Admin not existed" }
        }
        const passwordCheck = await bcrypt.compare(password, admin.password)
        console.log(passwordCheck, 'password check ');

        if (!passwordCheck) {
            return { success: false, message: "Invalid credentials, please try again " }
        }
        const SECRET_KEY = process.env.TOKEN_SECRET_KEY!
        console.log(SECRET_KEY,'secret key in admin controller ');
        

        const token = jwt.sign(
            { id: admin.id, email: admin.email }, 
            SECRET_KEY,                       
            { expiresIn: '1h' }                 
        );
        return { success: true, message: "Login successfully done" ,token}
    }

    async users() {
        try {
            const usersFromUsers = await userApi.get('/users')
            // console.log(usersFromUsers.data, 'usersFrm User s');
            const usersFromMentors = await mentorApi.get('/mentors')
            // console.log(usersFromMentors.data, 'users from mentors ');

            let k = usersFromUsers.data
            let m = usersFromMentors.data
            // for(let i = 0;i<k.length;i++){
            //     let user = k[i]
            //     let isFound = false
            //     for(let j = 0;j<m.length;j++){
            //         console.log(user._id,'m[i] * * * * * * * * *',m[j].mentor);

            //         if(k[i]._id==m[j].mentor){
            //             users.push({...k[i],...m[j]})
            //             isFound = true
            //             break
            //         }
            //     }
            //     console.log(isFound,'is found true or false ');

            //     if(!isFound){
            //         users.push(user)
            //     }
            // }

            const users = k.map((x: any) => {

                let findMentor = m.find((y: { mentor: any }) => y.mentor == x._id)
                if (findMentor) {
                    return {
                        ...x, ...findMentor
                    }
                }
                return x
            })
            // console.log(users,'  -  - - - - - - - - - - -');
            return { users }
        } catch (error) {
            console.error('Error founding on find users', error);
        }
    }
    async getUser(id:string){
        try {
            const commonData= await userApi.get(`/users/${id}`)
            console.log(commonData.data,'common data  ');
            if(commonData.data.role==='mentor'){
                const mentorData = await mentorApi.get(`/users/${id}`)
                console.log(mentorData.data,'mentorData, *( ) * ');
                
                const mergedData = {
                    ...commonData.data,
                    mentorDetails:mentorData.data.mentor
                }
                return { success: true, user: mergedData };
            }
            return {success:true,user:commonData.data}
            
        } catch (error) {
            console.error('Error founded in get user in mentor service',error);
            
        }
    }
}