import { TextField } from '@mui/material'
import React from 'react'
import Input from '@/components/Input'
import visionLogo from '../../assets/auth/vison_logo_black.svg'


const ApplyMentor2 = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
            <form className='w-full max-w-4xl p-8 bg-white shadow-md rounded-lg'>
                <div>
                    <div className='ms-8'>
                        <img src={visionLogo} alt="" />
                    </div>
                    <div className='flex justify-around'>
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
                            helperText="Add a YouTube video for your future mentees"
                            id="demo-helper-text-aligned" placeholder='http://introduction-video-url'
                            label="Introduction Video (Optional)" fullWidth
                        />

                    </div>
                    {/* right side */}
                    <div>
                    <TextField
                            helperText="Link an interview / podcast / piece of writing you are proud of or were featured in."
                            id="demo-helper-text-aligned" placeholder='http://blog-url'
                            label="Featured Article (Optional)" fullWidth
                        />
                    </div>
                    <div className='col-span-2'>
                        <TextField
                            id="outlined-multiline-static"
                            label="Why do you want to become mentor ?"
                            multiline
                            rows={3} fullWidth
                        // defaultValue="Default Value"
                        />
                    </div>
                    <div className='col-span-2'>
                        <TextField
                            id="outlined-multiline-static"
                            label="What , in your opinion, has been your greatest achievement so far ?"
                            multiline
                            rows={3} fullWidth
                        // defaultValue="Default Value"
                        />
                    </div>
                    {/* <div className='col-span-2 flex items-center'> */}
                    <div>
                        <Input label='Social Media URL' customClasses='w-full' />
                        {/* </div> */}
                        {/* <button className='ml-4 p-2 bg-gray-200 text-gray-500 rounded-md'>+</button> */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ApplyMentor2