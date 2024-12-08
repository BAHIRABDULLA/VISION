import { NextFunction, Request, Response } from 'express'
import { AdminService } from "../services/implementation/admin.service";
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { errorResponse, successResponse } from '../utils/response.helper';
import { HttpStatus } from '../enums/http.status';
import { IAdminService } from '../services/interface/IAdmin.service';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import { setRefreshTokenCookie } from '../utils/tokenSetCookie';


@injectable()
export class AdminController {

    private adminService: IAdminService;
    constructor(@inject(TYPES.AdminService) adminService: IAdminService) {
        this.adminService = adminService
    }


    async loginControl(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const response = await this.adminService.login(email, password);
            console.log(response, 'response in respn');

            if (!response?.token) {
                return errorResponse(res, HttpStatus.UNAUTHORIZED, 'Invalid credentials')
            }
            const refreshToken = generateRefreshToken(email)
            console.log(refreshToken, 'admin refresh token ');

            setRefreshTokenCookie(res, refreshToken)
            return successResponse(res, HttpStatus.OK, "Login successful", { token: response.token, user: email })
        } catch (error) {
            console.error('Error founded in login adminController ', error);
            next(error)
        }
    }


    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.adminService.users()
            if (!response) {
                return errorResponse(res, HttpStatus.NOTFOUND, 'Users not founded')
            }
            // res.json(response)
            return successResponse(res, HttpStatus.OK, 'Users sent', { users: response.users })
        } catch (error) {
            console.error("Error fetching all users", error);
            next(error)
        }
    }


    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            // console.log(id,'id in admin controller ');
            const response = await this.adminService.getUser(id)
            if (!response?.user) {
                return errorResponse(res, HttpStatus.NOTFOUND, "User data not found")
            }
            return successResponse(res, HttpStatus.OK, "User data successfully sent", response.user)
        } catch (error) {
            console.error('Error founded in get user', error);
            next(error)
        }
    }


    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('refreshToken-a')
            return successResponse(res, HttpStatus.OK, 'Logged out successfully')
        } catch (error) {
            console.error('Error founded in admin logout', error);
        }
    }



    async setNewAccessToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies['refreshToken-a']
            console.log(refreshToken, '= = = = =');

            if (!refreshToken) return res.status(HttpStatus.FORBIDDEN).json({ message: "No refresh token provided" })
            const secret = process.env.REFRESH_TOKEN_SECRET
            if (!secret) {
                return res.json({ message: "internal server error" })
            }
            const decoded = jwt.verify(refreshToken, secret)
            console.log(decoded, 'decoded in refresh token ');

            if (typeof decoded === 'object' && decoded !== null && 'email' in decoded) {

                const newAccessToken = generateAccessToken((decoded as JwtPayload).email)

                return res.json({ accessToken: newAccessToken });
            } else {
                res.clearCookie('refreshToken-a')
                return res.status(HttpStatus.FORBIDDEN).json({ message: "Invalid token payload" });
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.clearCookie('refreshToken-a')
                return res.status(HttpStatus.FORBIDDEN).json({ message: "Refresh token expired, please log in again" })
            }
            console.error("Error verifying refresh token:", error);
        }
    }

    async mentorApproval(req: Request, res: Response) {
        const { id } = req.params;
        const { isApproved } = req.body;
        try {
            if (!['pending', 'approved', 'rejected'].includes(isApproved)) {
                return res.status(400).json({ message: 'Invalid approval status' });
            }
            const updateMentorApproval = await this.adminService.updateApproval(id, isApproved)
            console.log(updateMentorApproval, 'upate mentor approval in admin side');

            return successResponse(res, HttpStatus.OK, "Mentor approval done", successResponse)
        } catch (error) {
            console.error('Error founded in mentor approval');
        }
    }


    async updateUserActiveStatus(req: Request, res: Response) {
        try {
            console.log('udpate4 usert active status *********');

            const { id } = req.params
            const { isActive } = req.body
            console.log(req.body, 'req.body in udpatea user active status', isActive)
            console.log(id, 'id in updatea user active status')
            const response = await this.adminService.updateUserStatus(id, isActive)
            return successResponse(res, HttpStatus.OK, "status updated")
        } catch (error) {
            console.error('Error founded in update user active status', error);
        }
    }


    async getAllCategories(req:Request,res:Response){
        try {
            const response = await this.adminService.getAllCategories()
            return successResponse(res,HttpStatus.OK,"All categories fetched",{categories:response})
        } catch (error) {
            console.error('Error founded in get all categories',error);
        }
    }

    async addNewCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { data } = req.body
            const { category, skills } = req.body
            console.log(data, 'data in add new cateogry ')
            console.log(category, skills, 'category , skills in add new category');
            const response = await this.adminService.addNewCategory(category, skills)
            return successResponse(res, HttpStatus.CREATED, "New Category added", response)
        } catch (error) {
            console.error('Error founded in addnew category controller', error);
            next(error)
        }
    }

    async updateCategory(req:Request,res:Response,next:NextFunction) {
        try {
            const {category,skills} = req.body
            console.log(category,'category',skills,'skills in update category');
            const response = await this.adminService.updateCategory(category,skills)
        } catch (error) {
            console.error('Error founded in update category in controller',error);
        }
    }
}