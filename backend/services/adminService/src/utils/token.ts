import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'

const secret_key = process.env.ACCESS_TOKEN_SECRET!
export const generateAccessToken = (email:string):string=>{
    return jwt.sign(
        { email },
        secret_key,
        { expiresIn: '30m' }
    )  
} 
export const generateRefreshToken = (email:string)=>{
    const secret = process.env.REFRESH_TOKEN_SECRET
    if(!secret){
        throw new Error('Refrsesh token secret in not defined')
    }
    return jwt.sign({email},secret,{expiresIn:'7d'})
}