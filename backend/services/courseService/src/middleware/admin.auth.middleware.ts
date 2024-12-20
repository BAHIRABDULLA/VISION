import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'


interface CustomeRequest extends Request {
    user?: string | JwtPayload
}


const adminAuthenticateToken = (req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']
        console.log(token,'token kjdkfjdkjfd');
        
        if (!token) {
            return res.status(401).json({ message: "Access denied . No token provided" })
        }
        const newToken = token?.split(' ')[1]
        console.log(newToken, 'token in auth middleware ');

        const secret = process.env.ACCESS_TOKEN_SECRET
        console.log(secret,'secretttt ');
        
        const decodedToken = jwt.decode(newToken, { complete: true });
        console.log(decodedToken, 'decoded token ');

        if (!secret) {
            throw new Error('Access token secret is not defined')
        }
        jwt.verify(newToken, secret, (err, user) => {
            console.log('-  -  -  -  -  -  -  -  -');

            if (err) {
                console.log(err,'err');
                
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = user as JwtPayload
            next()
        })

    } catch (error) {
        console.error('Error founded in authenticate token', error);
    }
}

export default adminAuthenticateToken