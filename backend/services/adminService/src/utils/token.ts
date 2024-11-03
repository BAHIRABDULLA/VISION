
import jwt from 'jsonwebtoken'

const secret_key = process.env.TOKEN_SECRET_KEY!
export const accessToken = (id:string,email:string):string=>{
    return jwt.sign(
        { id, email },
        secret_key,
        { expiresIn: '1h' }
    )  
} 
