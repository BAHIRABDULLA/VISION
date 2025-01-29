import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()
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
        jwt.verify(newToken, secret, (err, user) => {
            if (err) {
                console.log(err,'err',user,'user');
                
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = user as JwtPayload
            next()
        })

    } catch (error) {
        console.error('Error founded in authenticate token', error);
    }
}

export default authenticateToken