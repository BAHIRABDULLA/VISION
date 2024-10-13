import React, { useState } from 'react'
import ApplyMentor2 from './ApplyMentor2'
import ApplyMentor1 from './ApplyMentor1'
import { applyMentor } from '@/services/mentorApi'
import { useLocation, useNavigate } from 'react-router-dom';

const ApplyMentor = () => {
    const [step,setStep] = useState(1)
    const [formData,setFormData] = useState({})
    const location = useLocation()
    const {email} = location.state

    const navigate = useNavigate()

    const handleNextstep = (data:any)=>{
        setFormData({...formData,...data})
        setStep(step+1)
    }
    const prevStep = ()=>{
        setStep(step-1)
    }
    const handleFinish =async (data:any)=>{
        const finalData = {...formData,...data}
        const response = await applyMentor(finalData,email)
        if(response.data.success){
            navigate('/thanks-mentor')
        }else{
            navigate('/signup')
        }
    }

   
  return (
    <div  className=''>
        {step==1 && <ApplyMentor1 onNext={handleNextstep} />}
        {step==2 && <ApplyMentor2 prevStep={prevStep} onFinish={handleFinish} />}
    </div>
  )
}

export default ApplyMentor