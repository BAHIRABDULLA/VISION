import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TextField, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input';

import { courseSchema } from '@/utils/courseValidator';
import { addCourse } from '@/services/courseApi';
import { json } from 'stream/consumers';

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
      const curriculumData = [
        { level: 'Basic', topics: data.curriculum.basic.split(',') },
        { level: 'Intermediate', topics: data.curriculum.intermediate.split(',') },
        { level: 'Advanced', topics: data.curriculum.advanced.split(',') }
      ]
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('duration', data.duration)
      formData.append('overview', data.overview)

      formData.append('curriculum', JSON.stringify(curriculumData))
      formData.append('price', data.price.toString())
      if (selectedImage) {
        formData.append('image', selectedImage)
      }
      for (let key of formData.keys()) {
        console.log(key, '}}}}}}}}');
      }
      const response = await addCourse(formData)
      console.log(response, 'response in add couirse .tsx');
      if (response?.data) {
        toast.success("Course added");
        navigate('/admin/courses')
      } else {
        toast.error("Failed to add course");
      }
    } catch (error) {
      toast.error("Failed to add course");
      console.error('Error founded in on submti add course', error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setSelectedImage(file)
      console.log(selectedImage, 'selected image ');

      // setSelectedImage(URL.createObjectURL(file))
      // setImageFile(file)
    }
  }

  return (
    <Container maxWidth="lg" className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold">Add New Course</h1>

      <div className="mt-4">
        <Toaster />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="px-3 py-3">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 rounded-lg
            border-2 border-dashed border-gray-300 text-gray-900 text-sm cursor-pointer hover:bg-zinc-200 transition duration-300"
            >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M19.5 10a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h15zm-15-2A3.5 3.5 0 0 1 8 4.5h8A3.5 3.5 0 0 1 19.5 8h.5a2.5 2.5 0 0 1 2.5 2.5v9a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-9A2.5 2.5 0 0 1 4.5 8h.5z"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </label>
          {errors.image && <p className='text-red-500'>{errors.image.message as string}</p>}
          {selectedImage && (
            <div className="mt-4 mb-4 w-32 h-32 rounded-lg overflow-hidden border">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected preview"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <Input label="Course Name" customClasses="w-full" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}



          <TextField
            label="Overview"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            {...register("overview")}
          />
          {errors.overview && <p className="text-red-500">{errors.overview.message}</p>}

          <h2 className="text-xl font-semibold mt-3">Curriculum</h2>

          {/* Curriculum Section */}
          <div className="mt-1">
            {/* <h3 className="font-medium text-lg">Basic Topics</h3> */}
            <TextField
              label="Basic Topics (comma-separated)"
              multiline
              rows={2}
              fullWidth
              margin="normal"
              {...register("curriculum.basic")}
            />
            {errors.curriculum?.basic && (
              <p className="text-red-500">{errors.curriculum.basic.message}</p>
            )}
          </div>

          <div className="mt-1">
            {/* <h3 className="font-medium text-lg">Intermediate Topics</h3> */}
            <TextField
              label="Intermediate Topics (comma-separated)"
              multiline
              rows={2}
              fullWidth
              margin="normal"
              {...register("curriculum.intermediate")}
            />
            {errors.curriculum?.intermediate && (
              <p className="text-red-500">{errors.curriculum.intermediate.message}</p>
            )}
          </div>

          <div className="mt-1">
            {/* <h3 className="font-medium text-lg">Advanced Topics</h3> */}
            <TextField
              label="Advanced Topics (comma-separated)"
              multiline
              rows={2}
              fullWidth
              margin="normal"
              {...register("curriculum.advanced")}
            />
            {errors.curriculum?.advanced && (
              <p className="text-red-500">{errors.curriculum.advanced.message}</p>
            )}
          </div>
          <div className='flex gap-5'>
            <Input label="Duration" customClasses="w-full" {...register("duration")} />
            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}

            <Input label="Price" customClasses="w-full" {...register("price")} />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>


          <Button text="Add Course" type="submit" customClasses="bg-blue-400" />

          <Link className="ml-3" to="/admin/courses">
            Back
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default AddCourse;
