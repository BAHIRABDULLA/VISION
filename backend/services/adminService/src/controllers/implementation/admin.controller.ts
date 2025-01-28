import { NextFunction, Request, Response } from 'express'
import { AdminService } from "../../services/implementation/admin.service";
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { errorResponse, successResponse } from '../../utils/response.helper';
import { HttpStatus } from '../../enums/http.status';
import { IAdminService } from '../../services/interface/IAdmin.service';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken } from '../../utils/token';
import { setRefreshTokenCookie } from '../../utils/tokenSetCookie';
import { IAdminController } from '../interface/IAdmin.controller';


@injectable()
export class AdminController implements IAdminController {

    private adminService: IAdminService;
    constructor(@inject(TYPES.AdminService) adminService: IAdminService) {
        this.adminService = adminService
    }


    async loginControl(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const response = await this.adminService.login(email, password);
            if (!response?.token) {
                return errorResponse(res, HttpStatus.UNAUTHORIZED, 'Invalid credentials')
            }
            const refreshToken = generateRefreshToken(email)

            setRefreshTokenCookie(res, refreshToken)
            return successResponse(res, HttpStatus.OK, "Login successful", { token: response.token, user: email })
        } catch (error) {
            next(error)
        }
    }


    async getDashbaordData(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers['authorization']?.split(' ')[1]!
            const response = await this.adminService.getDashboardData(token)
            return successResponse(res, HttpStatus.OK, "dashboard data sent", { dashboardData: response })
        } catch (error) {
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
            next(error)
        }
    }


    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const response = await this.adminService.getUser(id)
            if (!response?.user) {
                return errorResponse(res, HttpStatus.NOTFOUND, "User data not found")
            }
            return successResponse(res, HttpStatus.OK, "User data successfully sent", response.user)
        } catch (error) {
            next(error)
        }
    }


    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie('refreshToken-a')
            return successResponse(res, HttpStatus.OK, 'Logged out successfully')
        } catch (error) {
            next(error)
        }
    }



    async setNewAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const refreshToken = req.cookies['refreshToken-a']

            if (!refreshToken) {
                res.status(HttpStatus.FORBIDDEN).json({ message: "No refresh token provided" })
                return
            }
            const secret = process.env.REFRESH_TOKEN_SECRET
            if (!secret) {
                res.json({ message: "internal server error" })
                return
            }
            const decoded = jwt.verify(refreshToken, secret)

            if (typeof decoded === 'object' && decoded !== null && 'email' in decoded) {

                const newAccessToken = generateAccessToken((decoded as JwtPayload).email)

                res.json({ accessToken: newAccessToken });
            } else {
                res.clearCookie('refreshToken-a')
                res.status(HttpStatus.FORBIDDEN).json({ message: "Invalid token payload" });
            }
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.clearCookie('refreshToken-a')
                res.status(HttpStatus.FORBIDDEN).json({ message: "Refresh token expired, please log in again" })
            }
            next(error)
        }
    }

    async mentorApproval(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { isApproved } = req.body;
        try {
            if (!['pending', 'approved', 'rejected'].includes(isApproved)) {
                res.status(400).json({ message: 'Invalid approval status' });
                return
            }
            const updateMentorApproval = await this.adminService.updateApproval(id, isApproved)

            return successResponse(res, HttpStatus.OK, "Mentor approval done", updateMentorApproval)
        } catch (error) {
            next(error)
        }
    }


    async updateUserActiveStatus(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params
            const { isActive } = req.body
            const response = await this.adminService.updateUserStatus(id, isActive)
            return successResponse(res, HttpStatus.OK, "status updated")
        } catch (error) {
            next(error)
        }
    }


    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.adminService.getAllCategories()
            return successResponse(res, HttpStatus.OK, "All categories fetched", { categories: response })
        } catch (error) {
            next(error)
        }
    }

    async addNewCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { data } = req.body
            const { category, skills } = req.body
            const response = await this.adminService.addNewCategory(category, skills)
            return successResponse(res, HttpStatus.CREATED, "New Category added", response)
        } catch (error) {
            next(error)
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const { category, skills } = req.body
            const response = await this.adminService.updateCategory(id, category, skills)
            return successResponse(res, HttpStatus.CREATED, 'Category updattion successfully done', response)
        } catch (error) {
            next(error)
        }
    }
}