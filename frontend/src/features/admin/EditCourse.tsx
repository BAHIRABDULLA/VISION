import React, { useState } from 'react'
import { TextField,  Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema } from '@/utils/courseValidator';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { editCourse } from '@/services/courseApi';


type courseShemaType = z.infer<typeof courseSchema>

const EditCourse = () => {

  const navigate = useNavigate()
  const params = useParams()
  console.log(params, 'params');

  const { register, handleSubmit, formState: { errors } } = useForm<courseShemaType>({
    resolver: zodResolver(courseSchema)
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  const onSubmit = async (data: courseShemaType) => {
    try {
      console.log(data, 'data in onsubmt');
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('duration', data.duration)
      formData.append('overview', data.overview)
      formData.append('curriculum', JSON.stringify(data.curriculum))
      formData.append('price', data.price.toString())
      if (selectedImage) {
        formData.append('image', selectedImage)
      }
      for (let key of formData.keys()) {
        console.log(key, '}}}}}}}}');
      }
      const response = await editCourse(formData,params)
      console.log(response, 'response in add couirse .tsx');
      if (response?.data.success) {
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
      <h1 className="text-3xl font-semibold">Edit Course</h1>

      <div className="mt-4">
        <Toaster />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="px-3 py-3">
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full bg-red-400 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500"
            id="dropzone-file"
            accept="image/*"
          />
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

          <div className='flex gap-4'>
            <Input label="Duration" customClasses="w-full" {...register("duration")} />
            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}

            <Input label="Price" customClasses="w-full" {...register("price")} />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>


          <Button text="Edit Course" type="submit" customClasses="bg-blue-400" />

          <Link className="ml-3" to="/admin/courses">
            Back
          </Link>
        </div>
      </form>
    </Container>
  );
}

export default EditCourse