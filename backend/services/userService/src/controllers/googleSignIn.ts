import { Request, Response } from "express"
import { authService } from "../services/authService"

export const googleSignIn = async (req: Request, res: Response) => {
    try {
        console.log('its reached in google sign in backend');
        
        const { email,name ,role} = req.body
        console.log(email,name,role,'email && name && role in backend ');
        
        const user = await authService.signInWithGoogle(email,name,role)
        return res.json(user)
    } catch (error) {
        
    }
  
    
}