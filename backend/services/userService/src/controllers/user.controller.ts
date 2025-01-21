import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/implementation/user.service";
import { User } from "../models/user.model";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../enums/http.status";
import { IUserService } from "../services/interface/IUser.service";
// import { uploadFileToS3 } from "../utils/upload";
import { FileArray, UploadedFile } from "express-fileupload";
import { s3, uploadFile } from "../utils/upload";
import { sendEmail } from "../utils/email.util";
import { sendUserData } from "../events/rabbitmq/producers/producer";



interface CustomeRequest extends Request {
    user?: string | JwtPayload,
    // file?:Express.Multer.File,
    // files?:FileArray| null | undefined
}

// const userService = new UserService()


export class UserController {
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
            res.status(HttpStatus.OK).json({ signedUrl ,key:fileName})
        } catch (error) {
            console.error('Error founded in generate signed url', error);
            next(error)
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.userService.getAllUsers()
            res.json(response)
        } catch (error) {
            console.error('Error founded fetching all users', error);
            next(error)
        }
    }


    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const user = await this.userService.getUser(id)
            res.json(user)
        } catch (error) {
            console.error('Error founded in get user', error);
            next(error)
        }
    }


    async updateUserApprovalStatus(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { isApproved } = req.body;
        try {
            const response = await this.userService.updateUserApproval({id, isApproved})
            return res.status(200).json({ success: true, response })
        } catch (error) {
            console.error('Error founded in update user approval status',error);
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
            console.error('Error founded in get user', error);
            next(error)
        }
    }


    // async profileUpdate(req: CustomeRequest, res: Response, next: NextFunction) {
    //     try {
    //         const user = req.user as JwtPayload
    //         if (!user) {
    //             return res.json({ message: 'Not founded user' })
    //         }
    //         const id = user.id
    //         const { fullName } = req.body
    //         let s3FileUrl = ''
    //         if (req.file) {
    //             const file = req.file
    //             const fileContent = file.buffer;
    //             const fileType = file.mimetype;
    //             const fileName = `uploads/${Date.now()}_${file.originalname}`;

    //             const result = await uploadFile(fileContent, fileName, fileType);
    //             if (!result) {
    //                 return res.status(HttpStatus.NOTFOUND).json({ success: false, message: '' })
    //             }
    //             s3FileUrl = result.Location

    //         }
    //         if (s3FileUrl === '') {
    //             s3FileUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
    //         }
    //         const updateUser = await this.userService.updateUser(id, { fullName, profile: s3FileUrl })

    //         res.status(HttpStatus.OK).json({ success: true, message: "update successfully", updateUser })
    //     } catch (error) {
    //         console.error('Error founded in profile update', error);
    //         next(error)
    //     }
    // }


    async profileUpdate(req: CustomeRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user as JwtPayload
            if (!user) {
                return res.json({ message: 'Not founded user' })
            }
            const id = user.id
            
            const { fullName ,fileKey} = req.body
            
            let profileUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
            if(fileKey){
                profileUrl = fileKey
                // profileUrl = `https://${process.env.BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${fileKey}`
            }
            
            const updateUser = await this.userService.updateUser(id, { fullName, profile: profileUrl })

            res.status(HttpStatus.OK).json({ success: true, message: "update successfully", updateUser })
        } catch (error) {
            console.error('Error founded in profile update', error);
            next(error)
        }
    }

    async updateUserStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { isActive } = req.body
            const { id } = req.params
            const response = await this.userService.updateUserStatus(id, isActive)
            return res.status(HttpStatus.OK).json(response)
        } catch (error) {
            console.error('Error founded in update user status', error);
            next(error)
        }
    }
}

