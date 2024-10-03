import { TextField } from '@mui/material'
import React from 'react'
import Input from '@/components/Input'
import visionLogo from '../../assets/auth/vison_logo_black.svg'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { applyMentor2 } from '@/services/mentorApi';

import {useLocation,useNavigate} from 'react-router-dom'

const applyMentorSchema = z.object({
    introductionVideoUrl: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.string().url({ message: "Invalid URL" }).optional()
    ),
    featuredArticleUrl: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.string().url({ message: "Invalid URL" }).optional(),
    ),
    whyBecomeMentor: z.string().min(1, { message: "This filed is required" }),
    greatestAchievement: z.string().min(1, { message: "This filed is required" })
});

type applyMentorSchemaType = z.infer<typeof applyMentorSchema>
const ApplyMentor2 = () => {

    const location = useLocation()
    const {email} = location?.state
    console.log(email,'email in location ');
    
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<applyMentorSchemaType>({ resolver: zodResolver(applyMentorSchema) })
    const onSubmit = async (data: any) => {
        console.log(data, 'data');
        const response = await applyMentor2(data,email)
        console.log(response,);
        if(response.data.success){
            navigate('/mentor/dashboard')
        }else{
            navigate('/signup')
        }
    }
    return (

        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
            <form onSubmit={(handleSubmit(onSubmit))} className='w-full max-w-4xl p-8   rounded-lg'>
                <div>
                    <div className='ms-2'>
                        <img src={visionLogo} alt="Vision logo" />
                    </div>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h1 className='text-3xl font-semiboldbold'>Apply As A Mentor</h1>
                            <h5 className='m-4'>It will take only few minutes</h5>
                        </div>
                        <div>
                            <h4 className='text-3xl font-semibold'>2 of 2</h4>
                        </div>
                    </div>
                </div>

                {/* input fields */}
                <div className='grid grid-cols-2 gap-4'>
                    {/* left side */}
                    <div>
                        <TextField
                            helperText="Add a YouTube video for your future mentees" {...register('introductionVideoUrl')}
                            id="demo-helper-text-aligned" placeholder='http://introduction-video-url'
                            label="Introduction Video (Optional)" fullWidth
                        />
                        {errors.introductionVideoUrl && <p className='text-sm text-red-700'>{errors.introductionVideoUrl.message}</p>}

                    </div>
                    {/* right side */}
                    <div>
                        <TextField
                            helperText="Link an interview / podcast / piece of writing you are proud of or were featured in."
                            id="demo-helper-text-aligned" placeholder='http://blog-url' {...register('featuredArticleUrl')}
                            label="Featured Article (Optional)" fullWidth 
                        />
                        {errors.featuredArticleUrl && <p className='text-sm text-red-700'>{errors.featuredArticleUrl.message}</p>}

                    </div>
                    <div className='col-span-2'>
                        <TextField
                            id="outlined-multiline-static"
                            label="Why do you want to become mentor ?"
                            multiline
                            rows={3} fullWidth {...register('whyBecomeMentor')}
                        // defaultValue="Default Value"
                        />
                        {errors.whyBecomeMentor && <p className='text-sm text-red-700'>{errors.whyBecomeMentor.message}</p>}
                    </div>
                    <div className='col-span-2'>
                        <TextField
                            id="outlined-multiline-static"
                            label="What , in your opinion, has been your greatest achievement so far ?"
                            multiline
                            rows={3} fullWidth {...register('greatestAchievement')}
                        // defaultValue="Default Value"
                        />
                        {errors.greatestAchievement && <p className='text-sm text-red-700'>{errors.greatestAchievement.message}</p>}
                    </div>
                    {/* <div className='col-span-2 flex items-center'> */}

                </div>
                <button type='submit' className=' py-1 mt-5 px-5  outline outline-offset-2 outline-gray-300 rounded-lg  '>Finish</button>
            </form>
        </div>
    )
}

export default ApplyMentor2