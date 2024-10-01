import React from 'react'
import visionLogo from '../../assets/auth/vison_logo_black.svg'
import Input from '@/components/Input'
import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'


const ApplyMentor1 = () => {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
                <form className='w-full max-w-6xl p-8  rounded-lg'>
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
                            <Input label='Job Title' customClasses='w-full' />
                            <Input label='Category'  customClasses='w-full'/>
                        </div>
                        {/* right side */}
                        <div>
                            <Input label='Location' customClasses='w-full' />
                            <Input label='Company (Optional)' customClasses='w-full' />
                        </div>
                        <div className='col-span-2'>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Skills"
                                multiline
                                maxRows={3} fullWidth
                            />
                        </div>
                        <div className='col-span-2'>
                            <TextField
                                id="outlined-multiline-static"
                                label="Bio"
                                multiline
                                rows={3} fullWidth
                            // defaultValue="Default Value"
                            />
                        </div>
                        <div className='col-span-2 flex items-center'>
                            <div>
                                <Input label='Social Media URL' customClasses='w-full' />
                            </div>
                            <button className='ml-4 p-2 bg-gray-200 text-gray-500 rounded-md'>+</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

export default ApplyMentor1