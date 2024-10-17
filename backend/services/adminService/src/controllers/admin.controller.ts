import { Request, Response } from 'express'
import { AdminService } from "../services/admin.service";

const adminService = new AdminService()


// export const adminController = {
//     loginControl: async (req: Request, res: any) => {
//         console.log('this is admin service controller ');

//         try {
//             const { email, password } = req.body

//             const response = await adminService.login(email, password)
//             return res.json(response)
//         } catch (error) {
//             console.error('Error founded in login adminController ');
//         }
//     },
//     getAllUsers: async (req: Request, res: Response) => {
//         try {
//             const response = await adminService.users()
//             console.log(response, 'response in get all users controller ');

//             res.json(response)
//         } catch (error) {
//             console.error("Error fetching all users", error);
//         }
//     }
// }


export class AdminController {
    async loginControl(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
        const response = await adminService.login(email, password);

        if (!response.success) {
             res.status(401).json({ message: response.message });
        }

     
         res.status(200).json({
            message: response.message,
            token: response.token ,
            user:email
        });
        
        } catch (error) {
            console.error('Error founded in login adminController ');
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const response = await adminService.users()
            // console.log(response, 'response in get all users controller ');

            res.json(response)
        } catch (error) {
            console.error("Error fetching all users", error);
        }
    }
    async getUserById(req:Request,res:Response){
        try {
            const {id} = req.params
            console.log(id,'id in get userBy id');
            
            const response = await adminService.getUser(id)
            console.log(response,'response in admin.controller ');
            
            res.json(response)
        } catch (error) {
            console.error('Error founded in get user',error);
            
        }
    }
}