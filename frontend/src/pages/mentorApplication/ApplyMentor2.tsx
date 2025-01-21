import { TextField } from '@mui/material'
import React from 'react'
import visionLogo from '../../assets/auth/vison_logo_black.svg'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useLocation } from 'react-router-dom'


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

type applyMentor2Props = {
    onFinish: (data: any) => void;
    prevStep: () => void;
}
const ApplyMentor2: React.FC<applyMentor2Props> = ({ prevStep, onFinish }) => {

    const location = useLocation()
    const { email } = location?.state

    const { register, handleSubmit, formState: { errors } } = useForm<applyMentorSchemaType>({ resolver: zodResolver(applyMentorSchema) })
 
    return (

        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
            <form onSubmit={(handleSubmit(onFinish))} className='w-full max-w-4xl p-8   rounded-lg'>
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
                <div className='flex gap-5  py-1 mt-2 px-5'>
                    <button type='button' onClick={prevStep} className='  py-1 mt-2 px-5 text-purple-800 outline outline-offset-2 outline-purple-500 rounded-lg '>Back</button>
                    <button type='submit' className=' py-1 mt-2 px-5 text-purple-800 outline outline-offset-2 outline-purple-500 rounded-lg  '>Finish</button>
                </div>

            </form>
        </div>
    )
}

export default ApplyMentor2