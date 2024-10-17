import React, { useState } from 'react';
import { TextField, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';

import { courseSchema } from '@/utils/courseValidator';

type courseShemaType = z.infer<typeof courseSchema>
const AddCourse = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<courseShemaType>({
    resolver: zodResolver(courseSchema)
  });

  const onSubmit = async (data: any)=>{

  }


  return (
    <Container maxWidth="sm">


      <h1 className='text-3xl font-semibold'>Add new Course</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

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


        <Input label='Price' customClasses='w-full' {...register('price')} />
        {errors.price && <p className='text-red-500'>{errors.price.message}</p>}


        <Button text='Add Course' type='submit' customClasses='bg-blue-400' />

        <Link className='ml-3' to='/admin/courses'>Back</Link>
      </form>
    </Container>
  );
};

export default AddCourse;
