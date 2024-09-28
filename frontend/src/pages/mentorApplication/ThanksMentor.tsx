import React from 'react'

const ThanksMentor = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center bg-gray-50'>
            <div className='p-8 bg-white rounded-lg shadow-lg text-center'>
                <h3 className='text-3xl font-bold text-purple-800 mb-4'>Thank you for applying as a mentor</h3>

                <p className='text-gray-600 mb-2'>We will review your application and get back you soon as possible</p>

                <p className='text-gray-600 mb-8'>You will receive an email at your registered address</p>
                
                <button className='text-purple-800 outline-rose-900'>Back to home </button>
            </div>

        </div>
    )
}

export default ThanksMentor