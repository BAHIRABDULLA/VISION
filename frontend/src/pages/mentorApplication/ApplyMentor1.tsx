import React from 'react'
import visionLogo from '../../assets/auth/vison_logo_black.svg'

const
    ApplyMentor1 = () => {
        return (
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
                        <h4 className='text-3xl font-semibold'>1 of 2</h4>
                    </div>
                </div>



            </div>
        )
    }

export default ApplyMentor1