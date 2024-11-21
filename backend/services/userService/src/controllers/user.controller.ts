import { Request, Response } from "express";
import { UserService } from "../services/implementation/user.service";
import { User } from "../models/user.model";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../enums/http.status";
import { IUserService } from "../services/interface/IUser.service";
// import { uploadFileToS3 } from "../utils/upload";
import { FileArray, UploadedFile } from "express-fileupload";
import { uploadFile } from "../utils/upload";
import { sendEmail } from "../utils/email.util";
import { sendMentorData } from "../events/rabbitmq/producers/producer";



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
    async getAllUsers(req: Request, res: Response) {
        try {
            const response = await this.userService.getAllUsers()
            res.json(response)
        } catch (error) {
            console.error('Error founded fetching all users', error);
        }
    }


    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            console.log('here is error', id);

            const user = await this.userService.getUser(id)
            res.json(user)
        } catch (error) {
            console.error('Error founded in get user', error);
        }
    }


    async updateUserStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { isApproved } = req.body;
        console.log(req.body, 'req.body in update user status in user controlelr');
        console.log(id, isApproved, 'id is approved');
        try {
            if (!['pending', 'approved', 'rejected'].includes(isApproved)) {
                return res.status(400).json({ message: 'Invalid approval status' });
            }
            const updatedUser = await User.findByIdAndUpdate(
                id,
                { isApproved },
                { new: true }
            );
            console.log(updatedUser, 'update  user ');

            if (!updatedUser) {
                return res.status(HttpStatus.NOTFOUND).json({ message: 'User not found' });
            }
            await sendMentorData('mentorApproval',{id,isApproved})
            await sendEmail(updatedUser?.email,
                'Your Mentor Application is Approved!',
                `
                    <h1>Congratulations</h1>
                    <p>We are excited to inform you that your application to become a mentor on Vision has been approved.</p>
                    <p>You can now log in and start mentoring to make a difference in the lives of our mentees.</p>
                    <p>Thank you for joining Vision!</p>
                    <br>
                    <p>Best Regards,<br>The Vision Team</p>
                ` ,
                true
            )
            res.status(200).json({ success: true, user: updatedUser });
        } catch (error) {

        }
    }

    async getUser(req: CustomeRequest, res: Response) {
        try {
            const user = req.user as JwtPayload
            console.log(user, 'user, ===========');
            if (!user) {
                return res.json({ message: 'Not founded user' })
            }
            const response = await this.userService.getUser(user.id)
            console.log(response, 'response in user controller get user');

            return res.status(HttpStatus.OK).json(response)
        } catch (error) {
            console.error('Error founded in get user', error);
        }
    }


    async profileUpdate(req: CustomeRequest, res: Response) {
        try {
            const user = req.user as JwtPayload
            if (!user) {
                return res.json({ message: 'Not founded user' })
            }
            const id = user.id
            const { fullName } = req.body
            let s3FileUrl = ''
            if (req.file) {
                const file = req.file
                const fileContent = file.buffer;
                const fileType = file.mimetype;
                const fileName = `uploads/${Date.now()}_${file.originalname}`;

                const result = await uploadFile(fileContent, fileName, fileType);
                if (!result) {
                    return res.status(HttpStatus.NOTFOUND).json({ success: false, message: '' })
                }
                s3FileUrl = result.Location
                console.log('Uploaded file URL:', s3FileUrl);

            }
            if (s3FileUrl === '') {
                s3FileUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            }
            const updateUser = await this.userService.updateUser(id, { fullName, profile: s3FileUrl })

            console.log(updateUser, 'update user = =  =   ');
            res.status(HttpStatus.OK).json({ success: true, message: "update successfully", updateUser })
        } catch (error) {
            console.error('Error founded in profile update', error);
        }
    }

}

