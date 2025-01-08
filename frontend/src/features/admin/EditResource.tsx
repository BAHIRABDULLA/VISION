import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { z } from 'zod';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseShemaType } from "./AddCourse";
import toast, { Toaster } from "react-hot-toast";
import { editResource, getAllCourses, getResourceDetails } from "@/services/courseApi";
import { CourseType } from "./Courses";


export const resourceSchema = z.object({
    title: z.string().min(1, { message: "Resource title is required" }),
    subtitle: z.string().min(1, { message: "Resource subtitle is required" }),
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
        message: "Content is required based on type",
        path: ["content"]
    }
)

type resourceSchemaType = z.infer<typeof resourceSchema>

type levelCourses = {
    level: 'basic' | 'intermediate' | 'advanced',
    topics: string[]
}


const EditResource = () => {

    const navigate = useNavigate()
    const [contentType, setContentType] = useState("text");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('')
    console.log(selectedCourse, 'selected course ');
    const [resource, setResource] = useState<resourceSchemaType>()
    console.log(resource, 'resource in edit resource');

    const [selelctedLevel, setSelectedLevel] = useState('')
    console.log(selelctedLevel, 'selected level ');

    const [topics, setTopics] = useState([])
    console.log(courses, 'course ');
    const params = useParams()

    // const [level, setLevel] = useState("Basic");
    const [content, setContent] = useState<File | null>(null);
    const levels = ["Basic", "Intermediate", "Advanced"];


    const { register, handleSubmit, setValue, formState: { errors } } = useForm<resourceSchemaType>({
        resolver: zodResolver(resourceSchema),
        defaultValues: {
            title: resource?.title,
            subtitle: resource?.subtitle,
            type: resource?.type,
            course: resource?.course?.name,
            level: resource?.level,
            topic: resource?.topic,
            content: resource?.content
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setContent(e.target.files[0])
            setValue("content", e.target.files[0])
        }
    }
    useEffect(() => {
        console.log(errors, 'errors in use effecty ');

    })
    useEffect(() => {
        const fetchResource = async () => {
            const response = await getResourceDetails(params.id);
            if (response?.status && response?.status >= 400) {
                toast.error(response?.data?.message || 'An error occurred');
            } else if (response?.data) {
                const resourceData = {
                    ...response.data,
                    subtitle: response.data.subTitle,
                };
                setResource(resourceData);
                // setValue("title", resourceData.title);
                // setValue("subtitle", resourceData.subtitle);
                // setValue("type", resourceData.type);
                setSelectedCourse(resourceData.course.name);
                setSelectedLevel(resourceData.level);
                // setValue("topic", resourceData.topic);

                if (resourceData.content && resourceData.type !== "text") {
                    setContent(resourceData.content);
                    setContentType(resourceData.type);
                }
            }
        };
        fetchResource();
    }, [params.id, setValue]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await getAllCourses()
            console.log(response, 'responspe');
            if (response?.data) {
                setCourses(response.data.data)
            }
        }
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
                setValue('topic', resource?.topic)
            } else {
                setTopics([])
            }
        } else {
            setTopics([])
        }
    }, [selectedCourse, selelctedLevel, courses, resource?.topic])



    const onSubmit = async (data: resourceSchemaType) => {
        const formData = new FormData();
        formData.append("title", data.title.trim());
        formData.append("subtitle", data.subtitle.trim());
        formData.append("type", data.type.trim());
        formData.append("course", data.course.trim());
        formData.append("level", data.level.trim());
        formData.append("topic", data.topic.trim());

        if (content) {
            formData.append("content", content);
        } else {
            formData.append("content", data.content)
        }
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1], 'pair in form data');
        }
        try {
            // const response =  await editResource(formData, 'id'); 
            // console.log(response,'response in add resource');

            // if(response.status&& response.status>=400){
            //     return toast.error(response.data.message||'There is an error occured')
            // }else{
            //     navigate('/admin/resources')
            // }
        } catch (error) {
            console.error('Error founded in edit resource', error);
        }

    };


    return (
        <div className="max-w-3xl mx-auto p-6   rounded-md">
            <Toaster />
            <Typography variant="h4" className="text-center font-bold mb-6">
                Add Resource
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
                <TextField label="Title" defaultValue={resource?.title} fullWidth className="bg-white" variant="outlined" {...register('title')} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <TextField label="Subtitle" defaultValue={resource?.subtitle} fullWidth className="bg-white" variant="outlined" {...register('subtitle')} />
                {errors.subtitle && <p className="text-red-500">{errors.subtitle.message}</p>}

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
                    {errors.type && <p className="text-red-500">{errors.type.message}</p>}
                </FormControl>


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
                    {errors.course && <p className="text-red-500">{errors.course.message}</p>}
                </FormControl>


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
                    {errors.level && <p className="text-red-500">{errors.level.message}</p>}
                </FormControl>


                <FormControl fullWidth className="bg-white mb-4">
                    <InputLabel>Topic</InputLabel>
                    <Select
                        value={resource?.topic}
                        variant="outlined"  {...register('topic')}
                        disabled={!topics.length}
                    >
                        {topics.map((topic, index) => (
                            <MenuItem key={index} value={topic}>
                                {topic}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.topic && <p className="text-red-500">{errors.topic.message}</p>}
                </FormControl>


                {contentType === "text" && (
                    <TextField defaultValue={resource?.content}
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
                        {content && (
                            <div>
                                <Typography>{content.name}</Typography>
                                <img src={URL.createObjectURL(content)} alt="" className="mt-4 w-32" />
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

export default EditResource;
