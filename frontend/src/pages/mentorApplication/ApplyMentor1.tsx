import React from 'react'
import visionLogo from '../../assets/auth/vison_logo_black.svg'
import Input from '@/components/Input'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';


const applyMentorSchema = z.object({
    jobTitle: z.string().min(1, { message: "Job Title is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    company: z.string().optional(),
    skills: z.string().min(1, { message: "Skills are required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
    socialMediaUrl: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.string().url({ message: "Invalid URL" }).optional()
    )
});

type applyMentorSchemaType = z.infer<typeof applyMentorSchema>;

type applyMentor1Props = {
    onNext:(data:any)=>void;
}

const ApplyMentor1:React.FC<applyMentor1Props>= ({ onNext }) => {
    const location = useLocation()
    const { email } = location.state
    console.log(email, 'email in apply mentor1 ');

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, } = useForm<applyMentorSchemaType>({ resolver: zodResolver(applyMentorSchema) })

    // const onSubmit = async (data: any) => {
    //     console.log(data);
    //     const response = await applyMentor1(data, email)
    //     console.log(response, 'response in apply mentro 1');
    //     if (response.data.success) {
    //         navigate('/apply-mentor-2', { state: { email } })
    //     } else {
    //         navigate('/')
    //     }
    // }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
            <form onSubmit={handleSubmit(onNext)} className='w-full max-w-6xl p-8  rounded-lg'>
                <div>
                    <div className='ms-2'>
                        <img src={visionLogo} alt="Vision Logo" />
                    </div>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h1 className='text-3xl font-semiboldbold'>Apply As A Mentor</h1>
                            <h5 className='m-4'>It will take only few minutes</h5>
                        </div>
                        <div>
                            <h4 className='text-3xl font-semibold'>1 of 2</h4>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-center mb-8'>
                    <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center'>
                        <span className='text-gray-400'>Image</span>
                    </div>
                    <button className='ml-4 px-4 py-2 text-sm border rounded-md'>Upload Photo</button>
                </div>


                {/* input fields */}
                <div className='grid grid-cols-2 gap-4'>
                    {/* left side */}
                    <div>
                        <Input label='Job Title *' customClasses='w-full' {...register('jobTitle')} />
                        {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}
                        <Input label='Category *' customClasses='w-full' {...register('category')} />
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    </div>
                    {/* right side */}
                    <div>
                        <Input label='Location *' customClasses='w-full' {...register('location')} />
                        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                        <Input label='Company (Optional)' customClasses='w-full' {...register('company')} />
                    </div>
                    <div className='col-span-2'>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Skills *"
                            multiline
                            maxRows={3} fullWidth {...register('skills')}
                        />
                        {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}
                    </div>
                    <div className='col-span-2'>
                        <TextField
                            id="outlined-multiline-static"
                            label="Bio *"
                            multiline
                            rows={3} fullWidth {...register('bio')}
                        // defaultValue="Default Value"
                        />
                        {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
                    </div>
                    <div className='col-span-2 flex items-center'>
                        <div>
                            <Input label='Social Media URL' customClasses='w-full' {...register('socialMediaUrl')} />
                            {errors.socialMediaUrl && <p className="text-red-500">{errors.socialMediaUrl.message}</p>}
                        </div>
                        <button className='ml-4 p-2 bg-gray-200 text-gray-500 rounded-md'>+</button>
                    </div>
                </div>
                <button type='submit' className=' py-1 mt-2 px-5 text-purple-800 outline outline-offset-2 outline-purple-500 rounded-lg  '>Next</button>
            </form>
        </div>
    )
}

export default ApplyMentor1