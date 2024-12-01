import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'

console.log(process.env.ACCESS_TOKEN_SECRET,'secdre  t key');


const secret_key = process.env.ACCESS_TOKEN_SECRET!
export const generateAccessToken = (email:string):string=>{
    return jwt.sign(
        { email },
        secret_key,
        { expiresIn: '2m' }
    )  
} 
export const generateRefreshToken = (email:string)=>{
    const secret = process.env.REFRESH_TOKEN_SECRET
    if(!secret){
        throw new Error('Refrsesh token secret in not defined')
    }
    return jwt.sign({email},secret,{expiresIn:'7m'})
}