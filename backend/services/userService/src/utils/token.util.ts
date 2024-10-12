import jwt from 'jsonwebtoken'

interface IUser {
    id: string;
    role: 'mentee' | 'mentor';
}

const generateAccessToken= (user:IUser )=>{
    const secret = process.env.ACCESS_TOKEN_SECRET
    console.log(secret,'secret in access token secret');
    if(!secret){
        throw new Error('Access token secret is not defined')
    }
    return jwt.sign(user,secret,{expiresIn:'15m'})
}

const generateRefreshToken = (user: {id:string,role:string})=>{
    const secret = process.env.REFRESH_TOKEN_SECRET
    if(!secret){
        throw new Error('Refrsesh token secret in not defined')
    }
    return jwt.sign(user,secret,{expiresIn:'7d'})
}

export {generateAccessToken,generateRefreshToken}