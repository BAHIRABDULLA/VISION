import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography } from "@mui/material";
import { addResource, getAllCourses } from "@/services/courseApi";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


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
const AddResources = () => {


    const [contentType, setContentType] = useState("text");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('')
    console.log(selectedCourse, 'selected course ');

    const [selelctedLevel, setSelectedLevel] = useState('')
    console.log(selelctedLevel, 'selected level ');

    const [topics, setTopics] = useState([])
    console.log(courses, 'course ');


    // const [level, setLevel] = useState("Basic");
    const [content, setContent] = useState<File | null>(null);
    const levels = ["Basic", "Intermediate", "Advanced"];


    const { register, handleSubmit, setValue, formState: { errors } } = useForm<resourceSchemaType>({
        resolver: zodResolver(resourceSchema)
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
            const course = courses.find((course) => course.name === selectedCourse)
            if (course && course.curriculum) {
                const levelTopics = course.curriculum.find((item) => {
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
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("subtitle", data.subtitle);
        formData.append("type", data.type);
        formData.append("course", data.course);
        formData.append("level", data.level);
        formData.append("topic", data.topic);
    
        if (content) { 
            formData.append("content", content);
        }
    
         await addResource(formData); 
    };
    

    return (
        <div className="max-w-3xl mx-auto p-6   rounded-md">
            <Typography variant="h4" className="text-center font-bold mb-6">
                Add Resource
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
                <TextField label="Title" fullWidth className="bg-white" variant="outlined" {...register('title')} />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                <TextField label="Subtitle" fullWidth className="bg-white" variant="outlined" {...register('subtitle')} />
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

export default AddResources;
