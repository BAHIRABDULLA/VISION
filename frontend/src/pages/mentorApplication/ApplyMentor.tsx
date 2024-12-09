import React, { useState } from 'react'
import ApplyMentor2 from './ApplyMentor2'
import ApplyMentor1 from './ApplyMentor1'
import { applyMentor } from '@/services/mentorApi'
import { useLocation, useNavigate } from 'react-router-dom';

const ApplyMentor = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({})
    const location = useLocation()
    const { email } = location.state

    const navigate = useNavigate()

    const handleNextstep = (data: any) => {
        console.log(data,'data dddd');
        
        setFormData({ ...formData, ...data })
        setStep(step + 1)
    }
    const prevStep = () => {
        setStep(step - 1)
    }
    const handleFinish = async (data: any) => {
        const finalData = { ...formData, ...data }
        const formDataObj = new FormData()
        for (const key in finalData) {
            console.log(key, 'key', finalData[key], 'finalData[key]')
            if (key === 'file') {
                if (finalData.file.length > 0) {
                    formDataObj.append(key, finalData.file[0])
                }
            } else if (typeof finalData[key] === 'object' && finalData[key] !== null) {
                formDataObj.append(key, JSON.stringify(finalData[key]));
            } else {
                formDataObj.append(key, finalData[key]);
            }
        }
        formDataObj.append('email', email)

        const response = await applyMentor(formDataObj)
        if (response.data.success) {
            console.log(response.data, 'response datae');

            navigate('/thanks-mentor')
        } else {
            navigate('/signup')
        }
    }


    return (
        <div className=''>
            {step == 1 && <ApplyMentor1 onNext={handleNextstep} />}
            {step == 2 && <ApplyMentor2 prevStep={prevStep} onFinish={handleFinish} />}
        </div>
    )
}

export default ApplyMentor