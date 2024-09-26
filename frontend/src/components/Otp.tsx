import React, { useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"


interface OtpProps {
    otp:string[];
    setOtp:(newOtp:string[])=>void
}

const Otp: React.FC<OtpProps> = ({otp,setOtp}) => {
    // const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
    const handleChange = (value:string)=>{
        console.log(value,'value in Otp .tsx');
        
        const newOtp = value.split('').slice(0,6)
        console.log(newOtp,'new Otp before new Otp');
        
        while(newOtp.length<6){
            newOtp.push('')
        }
        setOtp(newOtp)
        
    }
    
    return (
        <div>
            {/* <h3 className='text-3xl text-red-500'>Heeeeeiiiii</h3> */}
            <InputOTP maxLength={6} onChange={handleChange}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}

export default Otp