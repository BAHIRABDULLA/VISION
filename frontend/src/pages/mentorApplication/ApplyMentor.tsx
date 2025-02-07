import { useState } from 'react'
import ApplyMentor2 from './ApplyMentor2'
import ApplyMentor1 from './ApplyMentor1'
import { applyMentor, getSignedUrl } from '@/services/mentorApi'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetApplicationData, setFirstComponentData } from '@/redux/slices/mentorApplicationSlice';
import axios from 'axios';

const ApplyMentor = () => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({})
    const location = useLocation()
    const { email } = location.state

    const navigate = useNavigate()

    const handleNextstep = (data: any) => {
        dispatch(setFirstComponentData(data))
        console.log(data, 'data', formData, 'formData');

        setFormData({ ...formData, ...data })
        setStep(step + 1)
    }
    const prevStep = () => {
        setStep(step - 1)
    }


    const handleFinish = async (data: any) => {
        dispatch(resetApplicationData())
        const finalData = { ...formData, ...data }
        const formDataObj = new FormData()
        console.log(finalData, 'finalData');

        for (const keys in finalData) {
            if (keys === 'file') {

                if (finalData[keys] !== '' && finalData[keys] !== null) {
                    const file = finalData[keys]
                    const response = await getSignedUrl(
                        `profile/${Date.now()}_${file.name}`,
                        file.type
                    );
                    if (response?.status && response.status === 200) {
                        const { signedUrl, key } = response.data;
                        console.log(signedUrl, 'signedUrl', key, 'key');

                        const uploadImageToS3 = await axios.put(signedUrl, file, {
                            headers: { "Content-Type": file.type },
                        });
                        console.log(uploadImageToS3, 'uplaod image to s3');

                        finalData[keys] = key
                    }
                    console.log(finalData[keys], 'finalData key', keys, 'key');

                }


                // if (finalData.file.length > 0) {
                formDataObj.append(keys, finalData[keys])
                // }
            } else if (typeof finalData[keys] === 'object' && finalData[keys] !== null) {
                formDataObj.append(keys, JSON.stringify(finalData[keys]));
            } else {
                formDataObj.append(keys, finalData[keys]);
            }
        }
        formDataObj.append('email', email)
        for (let [key, value] of formDataObj.entries()) {
            console.log(`${key}:`, value);
        }

        const response = await applyMentor(formDataObj)
        if (response.data.success) {
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