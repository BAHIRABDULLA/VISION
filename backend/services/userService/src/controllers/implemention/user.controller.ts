import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../../enums/http.status";
import { IUserService } from "../../services/interface/IUser.service";
import { s3 } from "../../utils/upload";
import { IUserController } from "../interface/IUser.controller";



interface CustomeRequest extends Request {
    user?: string | JwtPayload,
}



export class UserController implements IUserController {
    private userService: IUserService
    constructor(userService: IUserService) {
        this.userService = userService
    }

    async generateSignedUrl(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileName, fileType } = req.body
            if (!fileName || !fileType) {
                return res.status(400).json({
                    success: false,
                    message: 'fileName and fileType are required'
                });
            }
            const params = {
                Bucket: process.env.BUCKET_NAME!,
                Key: fileName,
                Expires: 60,
                ContentType: fileType,

            }
            const signedUrl = await s3.getSignedUrlPromise('putObject', params)
            res.status(HttpStatus.OK).json({ signedUrl, key: fileName })
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.userService.getAllUsers()
            res.json(response)
        } catch (error) {
            next(error)
        }
    }


    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const user = await this.userService.getUser(id)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }


    async updateUserApprovalStatus(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { isApproved } = req.body;
        try {
            const response = await this.userService.updateUserApproval({ id, isApproved })
            res.status(200).json({ success: true, response })
        } catch (error) {
            next(error)
        }
    }

    async getUser(req: CustomeRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user as JwtPayload
            if (!user) {
                return res.json({ message: 'Not founded user' })
            }
            const response = await this.userService.getUser(user.id)

            return res.status(HttpStatus.OK).json(response)
        } catch (error) {
            next(error)
        }
    }



    async profileUpdate(req: CustomeRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user as JwtPayload
            if (!user) {
                res.json({ message: 'Not founded user' })
                return
            }
            const id = user.id

            const { fullName, fileKey } = req.body

            let profileUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
            if (fileKey) {
                profileUrl = fileKey
                // profileUrl = `https://${process.env.BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileKey}`
            }

            const updateUser = await this.userService.updateUser(id, { fullName, profile: profileUrl })

            res.status(HttpStatus.OK).json({ success: true, message: "update successfully", updateUser })
        } catch (error) {
            next(error)
        }
    }

    async updateUserStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { isActive } = req.body
            const { id } = req.params
            const response = await this.userService.updateUserStatus(id, isActive)
            res.status(HttpStatus.OK).json(response)
        } catch (error) {
            next(error)
        }
    }
}

