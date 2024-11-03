import { NextFunction, Request, Response } from 'express'
import { AdminService } from "../services/implementation/admin.service";
import { inject,injectable } from 'inversify';
import { TYPES } from '../types';
import { errorResponse, successResponse } from '../utils/response.helper';
import { HttpStatus } from '../enums/http.status';


@injectable()
export class AdminController {

    private adminService:AdminService;
    constructor(@inject(TYPES.AdminService) adminService:AdminService){
        this.adminService = adminService
    }

    async loginControl(req: Request, res: Response,next:NextFunction){
        try {
            const { email, password } = req.body;
            const response = await this.adminService.login(email, password);
            if(!response?.token){
                return errorResponse(res,HttpStatus.Unauthorized,'Invalid credential')
            }
            return successResponse(res,HttpStatus.OK,"Login successful",{token:response.token,user:email})
        } catch (error) {
            console.error('Error founded in login adminController ');
            next(error)
        }
    }


    async getAllUsers(req: Request, res: Response,next:NextFunction) {
        try {
            const response = await this.adminService.users()
            if(!response){
                return errorResponse(res,HttpStatus.NotFound,'Users not founded')
            }
            res.json(response)
            return successResponse(res,HttpStatus.OK,'Users sent',response.users)
        } catch (error) {
            console.error("Error fetching all users", error);
            next(error)
        }
    }


    async getUserById(req: Request, res: Response ,next:NextFunction) {
        try {
            const { id } = req.params
            // console.log(id,'id in admin controller ');
            const response = await this.adminService.getUser(id)
            if(!response?.user){
                return errorResponse(res,HttpStatus.NotFound,"User data not found")
            }
            return successResponse(res,HttpStatus.OK,"User data successfully sent",response.user)
        } catch (error) {
            console.error('Error founded in get user', error);
            next(error)
        }
    }
}