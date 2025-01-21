import React from 'react'
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

const Otp: React.FC<OtpProps> = ({setOtp}) => {
    // const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
    const handleChange = (value:string)=>{
        const newOtp = value.split('').slice(0,6)        
        while(newOtp.length<6){
            newOtp.push('')
        }
        setOtp(newOtp)
        
    }
    
    return (
        <div>
            {/* <h3 className='text-3xl text-red-500'>Heeeeeiiiii</h3> */}
            <InputOTP maxLength={6} onChange={handleChange}>
                <InputOTPGroup >
                    <InputOTPSlot index={0} style={{ color: 'black' }} />
                    <InputOTPSlot index={1} style={{ color: 'black' }} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={2} style={{ color: 'black' }} />
                    <InputOTPSlot index={3} style={{ color: 'black' }} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} style={{ color: 'black' }} />
                    <InputOTPSlot index={5} style={{ color: 'black' }} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    )
}

export default Otp