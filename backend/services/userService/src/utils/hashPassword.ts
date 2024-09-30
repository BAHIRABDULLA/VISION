import bcrypt from 'bcryptjs'

export const randomPassword = bcrypt.hashSync(Math.random().toString(36).slice(-8), 10);


export const hashPassword = async(password:string)=>{
    const saltRounds = 10
    return bcrypt.hash(password,saltRounds)
}