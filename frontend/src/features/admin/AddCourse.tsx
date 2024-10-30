import React, { useEffect, useState } from 'react';
import toast,{ Toaster } from 'react-hot-toast';
import { TextField, Typography, Container } from '@mui/material';
import { Link ,useNavigate} from 'react-router-dom';
import Button from '@/components/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';

import { courseSchema } from '@/utils/courseValidator';
import { addCourse } from '@/services/courseApi';

type courseShemaType = z.infer<typeof courseSchema>


const AddCourse = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<courseShemaType>({
    resolver: zodResolver(courseSchema)
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [imageFile , setImageFile] = useState<File | null>(null)

  useEffect(() => {
    console.log(errors, 'errors in add course');
    
  })

  const onSubmit = async (data: courseShemaType) => {
    try {
      console.log(data, 'data in onsubmt');
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('duration', data.duration)
      formData.append('overview', data.overview)
      formData.append('curriculum', data.curriculum)
      formData.append('price', data.price.toString())
      if (selectedImage) {
        formData.append('image', selectedImage)
      }
      for(let key of formData.keys()){
        console.log(key,'}}}}}}}}');
      }
      const response = await addCourse(formData)
      console.log(response, 'response in add couirse .tsx');
      if(response?.data.success){
        toast.success("Course added");
        navigate('/admin/courses')
      }else{
        toast.error("Failed to add course");
      }
    } catch (error) {
      toast.error("Failed to add course");
      console.error('Error founded in on submti add course',error);
    }
  }

  const handlemImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setSelectedImage(file)
      console.log(selectedImage, 'selected image ');

      // setSelectedImage(URL.createObjectURL(file))
      // setImageFile(file)
    }
  }

  return (
    <Container maxWidth="sm">


      <h1 className='text-3xl font-semibold'>Add new Course</h1>

      <div className='mt-4 '>
        <Toaster />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>

        <div className='px-3 py-3'>

          {/* 
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" accept='image/*'  {...register('image')} />
            </label>
          </div> */}

          <input type="file" onChange={handlemImageChange} className="w-full bg-red-400 rounded-lg border border-gray-300 
          text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500" id="dropzone-file" accept='image/*' />
          {selectedImage && (
            <div className="mt-4 mb-4 w-32 h-32 rounded-lg overflow-hidden border">
              <img src={URL.createObjectURL(selectedImage)} alt="Selected preview" className="object-cover w-full h-full" /> </div>
          )}

          <Input label='Course Name' customClasses='w-full' {...register('name')} />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          <Input label='Duration' customClasses='w-full' {...register('duration')} />
          {errors.duration && <p className='text-red-500'>{errors.duration.message}</p>}


          <TextField label="Overview" multiline
            rows={3} fullWidth margin="normal" {...register('overview')} />
          {errors.overview && <p className='text-red-500'>{errors.overview.message}</p>}


          <TextField label="Curriculum" multiline
            rows={3} fullWidth margin="normal" {...register('curriculum')} />
          {errors.curriculum && <p className='text-red-500'>{errors.curriculum.message}</p>}


          <Input label='Price'  customClasses='w-full' {...register('price')} />
          {errors.price && <p className='text-red-500'>{errors.price.message}</p>}


          <Button text='Add Course' type='submit' customClasses='bg-blue-400' />

          <Link className='ml-3' to='/admin/courses'>Back</Link>
        </div>
      </form>
    </Container>
  );
};

export default AddCourse;
