import jwt,{JwtPayload} from 'jsonwebtoken'
import { Request, Response } from "express";

export const setNewAccessToken = async (req: Request, res: any) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.status(403).json({ message: "No refresh token provided" })
    try {
        const secret = process.env.REFRESH_TOKEN_SECRET
        if (!secret) {
            return res.json({ message: "internal server error" })
        }
        const decoded = jwt.verify(refreshToken, secret)

        if (typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'role' in decoded) {
            const newAccessToken = jwt.sign({ id: (decoded as JwtPayload).id, role: (decoded as JwtPayload).role }, process.env.ACCESS_TOKEN_SECRET!, {
                expiresIn: '15m',
            });   
            return res.json({ accessToken: newAccessToken });
        } else {
            return res.status(403).json({ message: "Invalid token payload" });
        }
    } catch (error) {
        console.error("Error verifying refresh token:", error);
    }
}

