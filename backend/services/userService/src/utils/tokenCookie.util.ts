import { Response } from 'express';

export const setRefreshTokenCookie = (res: Response, refreshToken: string,role:string) => {
    let refreshTokenName:string
    if(role==='mentee'){
        refreshTokenName = 'refreshToken-me'
    }else{
        refreshTokenName = 'refreshToken-mr'
    }
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'none',
        // path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

//sign in 
// .cookie('refreshToken', result.refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 7 * 24 * 60 * 1000,

// }).