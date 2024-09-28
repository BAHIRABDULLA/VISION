import React from 'react'

const Testimonial = () => {
  return (
    <section className='py-10 bg-gray-800'>
        <h2 className='text-4xl text-center font-bold'>Testimonials</h2>
        <div className='grid grid-cols-3 gap-6 px-10 mt-8'>
            <div className='text-center'>
                <p>" Great experience , learned a lot! "</p>
                <h3 className='mt-4 font-bold'>- Student 1</h3>
            </div>
            <div className='text-center'>
                <p>"Amazing mentors and resources!"</p>
                <h3 className='mt-4 font-bold'>- Student 1</h3>
            </div>
            <div className='text-center'>
                <p>"Helped me land my dream job!"</p>
                <h3 className='mt-4 font-bold'>- Student 1</h3>
            </div>
        </div>
    </section>
  )
}

export default Testimonial