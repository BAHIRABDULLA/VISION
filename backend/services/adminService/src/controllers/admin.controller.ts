import { Request, Response } from 'express'
import { AdminService } from "../services/admin.service";

const adminService = new AdminService()


export class AdminController {


    async loginControl(req: Request, res: Response){
        try {
            const { email, password } = req.body;
            const response = await adminService.login(email, password);

            if (!response) {
               return res.status(500).json({ message: 'Internal server error: no response from adminService.' });
            }

            if (!response.success) {
                res.status(401).json({ message: response.message });
            }

            res.status(200).json({
                message: response.message,
                token: response.token,
                user: email
            });
        } catch (error) {
            console.error('Error founded in login adminController ');
        }
    }


    async getAllUsers(req: Request, res: Response) {
        try {
            const response = await adminService.users()
            res.json(response)
        } catch (error) {
            console.error("Error fetching all users", error);
        }
    }


    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await adminService.getUser(id)
            res.json(response)
        } catch (error) {
            console.error('Error founded in get user', error);
        }
    }
}