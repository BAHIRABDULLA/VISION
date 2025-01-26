import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addResource, getAllCourses, getSignedUrl } from "@/services/courseApi";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseShemaType } from "./AddCourse";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import ImageCropper from "@/components/ImageCropper";


export const resourceSchema = z.object({
    title: z.string().min(1, { message: "Resource title is required" }),
    type: z.enum(['text', 'image', 'video'], { message: "Resource type is required" }),
    course: z.string().min(1, { message: "Course is required" }),
    level: z.string().min(1, { message: "Course level is required" }),
    topic: z.string().min(1, { message: "Course topic is required" }),
    content: z.union([z.string().optional(), z.instanceof(File).optional()]).optional(),

}).refine(
    (data) =>
        (data.type === 'text' && typeof data.content === 'string' && data.content.trim().length > 0) ||
        (data.type === 'image' && data.content instanceof File) ||
        (data.type === 'video' && data.content instanceof File),
    {
        message: "Content is requir ed based on type",
        path: ["content"]
    }
)

type resourceSchemaType = z.infer<typeof resourceSchema>

type levelCourses = {
    level: 'basic' | 'intermediate' | 'advanced',
    topics: string[]
}
const AddResources = () => {

    const navigate = useNavigate()
    const [contentType, setContentType] = useState("text");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('')
    const [selelctedLevel, setSelectedLevel] = useState('')
    const [topics, setTopics] = useState([])
    const [content, setContent] = useState<File | null>(null);
    const levels = ["Basic", "Intermediate", "Advanced"];
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [isImageCropCanvas,setIsImageCropCanvas] = useState(false)

    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    console.log(signedUrl, 'signed url ');

    const [filekey, setFileKey] = useState<string | null>(null);
    console.log(filekey, 'file key');

    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    console.log(croppedImageUrl, 'cropped image url ');
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<resourceSchemaType>({
        resolver: zodResolver(resourceSchema)
    });


    useEffect(() => {
        console.log(errors, 'errors in use effecty ');

    })

    const fetchCourses = async () => {
        const response = await getAllCourses()
        if (response?.data) {
            setCourses(response.data.data)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    useEffect(() => {
        if (selectedCourse && selelctedLevel) {
            const course: any = courses.find((course: courseShemaType) => course.name === selectedCourse)
            if (course && course.curriculum) {
                const levelTopics: levelCourses = course.curriculum.find((item) => {
                    return item.level === selelctedLevel
                })
                setTopics(levelTopics ? levelTopics.topics : [])
            } else {
                setTopics([])
            }
        } else {
            setTopics([])
        }
    }, [selectedCourse, selelctedLevel, courses])


    const onSubmit = async (data: resourceSchemaType) => {

        if (contentType!=='text') {
            await uploadFileToS3(content, signedUrl)
        }
        const response = await addResource(data);

        if (response.status && response.status >= 400) {
            return toast.error(response.data.message || 'There is an error occured')
        } else {
            navigate('/admin/resources')
        }
    };

    const generateSignedUrl = async (file: File) => {
        try {
            const response = await getSignedUrl(`${Date.now()}_${file.name}`, file.type)
            if (response?.status && response.status === 200) {
                const { signedUrl, key } = response.data
                setSignedUrl(signedUrl)
                setFileKey(key)
            } else {
                toast.error('Failed to generate signed url')
            }
        } catch (error) {
            console.error('Error founded in common data saving', error);
            toast.error('An error occurred while uploading the file')
        }
    }

    const uploadFileToS3 = async (file, presignedUrl) => {
        try {
            const response = await axios.put(presignedUrl, file, {
                headers: {
                    "Content-Type": file.type
                }
            })
            return response
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const file = e.target.files[0]
        // console.log(file, 'file file file');

        // if (file) {
        //     const reader = new FileReader();

        //     reader.readAsDataURL(file);
        //     console.log(imageSrc,'reader result')
        //     setContent(file)
        //     setValue("content", file)
        //     generateSignedUrl(file)
        // }
        const file = e.target.files?.[0];
        if (file) {
            setContent(file)
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result as string);
            setValue("content", file)
            
            reader.readAsDataURL(file);
            setIsImageCropCanvas(true)
        }
    }


    const handleCropComplete = (croppedBlob: Blob) => {
        console.log(croppedBlob,'cropped blob');
        
        const croppedUrl = URL.createObjectURL(croppedBlob)
        
        setCroppedImageUrl(croppedUrl)
        const croppedFile = new File([croppedBlob],"cropped-image.jpg",{
            type:'image/jpeg'
        })
        console.log(content,'content in handle crope complete');
        
        generateSignedUrl(content)
        setIsImageCropCanvas(false)

    }


    return (
        <div className="max-w-3xl mx-auto p-6   rounded-md">
            <Toaster />
            <Typography variant="h4" className="text-center font-bold mb-6">
                Add Resource
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
                <TextField label="Title" fullWidth className="bg-white" variant="outlined" {...register('title')} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <FormControl fullWidth className="bg-white">
                    <InputLabel>Type of Content</InputLabel>
                    <Select
                        value={contentType}  {...register('type')}
                        onChange={(e) => setContentType(e.target.value)}
                        variant="outlined"
                    >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="image">Image</MenuItem>
                        <MenuItem value="video">Video</MenuItem>
                    </Select>
                </FormControl>
                {errors.type && <p className="text-red-500">{errors.type.message}</p>}


                <FormControl fullWidth className="bg-white">
                    <InputLabel>Course</InputLabel>
                    <Select
                        value={selectedCourse} {...register('course')}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        variant="outlined"
                    >
                        {courses.map((course) => (
                            <MenuItem key={course.name} value={course.name}>
                                {course.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {errors.course && <p className="text-red-500">{errors.course.message}</p>}


                <FormControl fullWidth className="bg-white">
                    <InputLabel>Level</InputLabel>
                    <Select
                        value={selelctedLevel}  {...register('level')}
                        onChange={(e) => setSelectedLevel(e.target.value)} variant="outlined"
                    >
                        {levels.map((lvl) => (
                            <MenuItem key={lvl} value={lvl}> {lvl} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {errors.level && <p className="text-red-500">{errors.level.message}</p>}


                <FormControl fullWidth className="bg-white mb-4">
                    <InputLabel>Topic</InputLabel>
                    <Select
                        variant="outlined"  {...register('topic')}
                        disabled={!topics.length}
                    >
                        {topics.map((topic, index) => (
                            <MenuItem key={index} value={topic}>
                                {topic}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {errors.topic && <p className="text-red-500">{errors.topic.message}</p>}


                {contentType === "text" && (
                    <TextField
                        label="Content" fullWidth multiline rows={4}
                        className="bg-white"
                        variant="outlined" {...register('content')}
                    />
                )}
                {contentType === "image" && (
                    <div>
                        <Button
                            variant="contained" component="label"
                            className="bg-blue-500 text-white hover:bg-blue-700"
                        >
                            Upload Image
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </Button>
                        {isImageCropCanvas && <ImageCropper imageSrc={imageSrc} onCropComplete={handleCropComplete} />}
                        {croppedImageUrl && (
                            <div>
                                <Typography>{content.name}</Typography>
                                <img src={croppedImageUrl} alt="" className="mt-4 w-32" />
                            </div>
                        )}

                    </div>

                )}
                {contentType === "video" && (
                    <div>
                        <Button
                            variant="contained" component="label"
                            className="bg-green-500 text-white hover:bg-green-700"
                        >
                            Upload Video
                            <input type="file" hidden accept="video/*" onChange={handleFileChange} />
                        </Button>
                        {content && (
                            <div>
                                <Typography>{content.name}</Typography>
                                <video src={URL.createObjectURL(content)} controls className="mt-4 w-full h-auto"></video>
                            </div>

                        )}
                    </div>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2"
                >
                    Submit Resource
                </Button>
            </form>
        </div>
    );
};

export default AddResources;
