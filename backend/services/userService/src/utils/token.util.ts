import jwt from 'jsonwebtoken'

interface IUser {
    id: string;
    email:string
    role: 'mentee' | 'mentor';
}

const generateAccessToken= (user:IUser )=>{
    const secret = process.env.ACCESS_TOKEN_SECRET
    console.log(secret,'secret in access token secret');
    if(!secret){
        throw new Error('Access token secret is not defined')
    }
    return jwt.sign(user,secret,{expiresIn:'4s'})
}

const generateRefreshToken = (user: IUser)=>{
    const secret = process.env.REFRESH_TOKEN_SECRET
    if(!secret){
        throw new Error('Refrsesh token secret in not defined')
    }
    return jwt.sign(user,secret,{expiresIn:'1m'})
}

export {generateAccessToken,generateRefreshToken}