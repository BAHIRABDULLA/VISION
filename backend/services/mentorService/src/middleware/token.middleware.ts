import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { User } from '../model/user.model'


interface CustomeRequest extends Request {
    user?: string | JwtPayload
}


const authenticateToken = (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']
        if (!token) {
            return res.status(401).json({ message: "Access denied . No token provided" })
        }
        const newToken = token?.split(' ')[1]

        const secret = process.env.ACCESS_TOKEN_SECRET
        const decodedToken = jwt.decode(newToken, { complete: true });

        if (!secret) {
            throw new Error('Access token secret is not defined')
        }
        jwt.verify(newToken, secret, async (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = user as JwtPayload
            const userId = req.user.id
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' })
            }
            const userData = await User.findById(userId)
            if (!userData) {
                return res.status(404).json({ message: "User not found" });
            }

            if (!userData.isActive) {
                return res.status(403).json({ message: "Your account has been blocked. Please contact support." });
            }
            next()
        })

    } catch (error) {
        console.error('Error founded in authenticate token', error);
    }
}

export default authenticateToken