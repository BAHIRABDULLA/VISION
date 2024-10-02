import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']
        console.log(token, 'token in auth middleware');
        if (!token) {
            return res.status(401).json({ message: "Access denied . No token provided" })
    }
        const secret = process.env.ACCESS_TOKEN_SECRET
        if (!secret) {
            throw new Error('Access token secret is not defined')
        }
        jwt.verify(token, secret, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid token' });
            (req as any).user = user
            next()
        })

    } catch (error) {
        console.error('Error founded in authenticate token', error);
    }
}

export default authenticateToken