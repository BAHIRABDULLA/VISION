import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseShemaType } from "./AddCourse";
import toast, { Toaster } from "react-hot-toast";
import { editResource, getAllCourses, getResourceDetails, getSignedUrl } from "@/services/courseApi";
import axios from "axios";


export const resourceSchema = z.object({
    title: z.string().min(1, { message: "Resource title is required" }),
    type: z.enum(['text', 'image', 'video'], { message: "Resource type is required" }),
    course: z.string().min(1, { message: "Course is required" }),
    level: z.string().min(1, { message: "Course level is required" }),
    topic: z.string().trim().min(1, { message: "Course topic is required" }),
    content: z.union([z.string(), z.instanceof(File)]).optional(), // content can be string (URL) or File
}).superRefine((data, ctx) => {
    if (data.type === 'text' && (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Content is required for text type",
            path: ["content"]
        });
    }

    if (data.type === 'image' && (!data.content || (typeof data.content !== 'string' && !(data.content instanceof File)))) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Image file required",
            path: ["content"]
        });
    }

    if (data.type === 'video' && (!data.content || (typeof data.content !== 'string' && !(data.content instanceof File)))) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Video file required",
            path: ["content"]
        });
    }
});


type resourceSchemaType = z.infer<typeof resourceSchema>

type levelCourses = {
    level: 'basic' | 'intermediate' | 'advanced',
    topics: string[]
}


const EditResource = () => {
    const navigate = useNavigate();
    const [contentType, setContentType] = useState("text");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [resource, setResource] = useState<resourceSchemaType>();
    const [selectedLevel, setSelectedLevel] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const params = useParams();
    const [content, setContent] = useState<File | null>(null);
    const levels = ["Basic", "Intermediate", "Advanced"];

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<resourceSchemaType>({
        resolver: zodResolver(resourceSchema),
        // defaultValues: {
        //     title: resource?.title,
        //     type: resource?.type,
        //     course: resource?.course,
        //     level: resource?.level,
        //     topic: resource?.topic,
        //     content: resource?.content
        // }
    });
    useEffect(() => {
        console.log(errors, 'errors in edit resource');
    })
    const generateSignedUrl = async (file: File) => {
        try {
            const response = await getSignedUrl(`${Date.now()}_${file.name}`, file.type);
            if (response?.status && response.status === 200) {
                const { signedUrl, key } = response.data;
                return {signedUrl, key};
            } else {
                toast.error('Failed to generate signed url');
            }
        } catch (error) {
            console.error('Error generating signed URL:', error);
            toast.error('An error occurred while preparing the file upload');
        }
    };

    const uploadFileToS3 = async (file: File, presignedUrl: string) => {
        try {
            const response = await axios.put(presignedUrl, file, {
                headers: {
                    "Content-Type": file.type,
                    "Accept": "application/json"
                }
            });
            return response;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setContent(file);
            setValue("content", file);
        }
    };

    useEffect(() => {
        const fetchResource = async () => {
            const response = await getResourceDetails(params.id);

            if (response?.status && response?.status >= 400) {
                toast.error(response?.data?.message || 'An error occurred');
            } else if (response?.data) {
                const resourceData = response.data;
                setResource(resourceData);
                setSelectedCourse(resourceData.course.name);
                setSelectedLevel(resourceData.level);
                setSelectedTopic(resourceData.topic);
                setContentType(resourceData.type);
                setValue("topic", resourceData.topic);
                setValue("title", resourceData.title);
                setValue("type", resourceData.type);
                setValue("course", resourceData.course.name);
                setValue("level", resourceData.level);
                setValue("content", resourceData.content || '');



                if (resourceData.content) {
                    if (resourceData.type === 'text') {
                        setValue("content", resourceData.content);
                    } else {
                        setValue("content", resourceData.content);
                    }
                }
            }
        };
        fetchResource();
    }, [params.id, setValue]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await getAllCourses();
            if (response?.data) {
                setCourses(response.data.data);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCourse && selectedLevel) {
            const course: any = courses.find((course: courseShemaType) => course.name === selectedCourse);
            if (course && course.curriculum) {
                const levelTopics: levelCourses = course.curriculum.find((item) => {
                    return item.level === selectedLevel;
                });
                setTopics(levelTopics ? levelTopics.topics : []);
            } else {
                setTopics([]);
            }
        } else {
            setTopics([]);
        }
    }, [selectedCourse, selectedLevel, courses]);
    const extractFileName = (url: string) => {
        try {
            return url.split("/").pop()?.split("?")[0];
        } catch {
            return url;
        };
    }


    const onSubmit = async (data: resourceSchemaType) => {

        try {
            let updatedContent = data.content;
            if (contentType !== 'text' && content) {

                const getSignedUrl = await generateSignedUrl(content);
                const {signedUrl, key} = getSignedUrl;


                if (signedUrl) {
                    await uploadFileToS3(content, signedUrl);

                    updatedContent = key;
                }
            } else if (resource.content && typeof resource.content === 'string' && resource.content.includes('https')) {
                updatedContent = extractFileName(resource.content);
            }
            const formData = new FormData();
            formData.append("title", data.title.trim());
            formData.append("type", data.type.trim());
            const selectedCourseObj = courses.find((course) => course.name === selectedCourse);
            if (!selectedCourseObj) {
                toast.error('Invalid course selection');
                return;
            }
            formData.append("course", selectedCourseObj._id);
            formData.append("level", data.level);
            formData.append("topic", data.topic);

            if (contentType === 'text') {
                formData.append("content", data.content as string);
            } else {
                formData.append("content", updatedContent || '');
            }

            const response = await editResource(formData, params.id);
            if (response.status && response.status >= 400) {
                toast.error(response.data.message || 'An error occurred');
            } else {
                toast.success('Resource updated successfully');
                navigate('/admin/resources');
            }
        } catch (error) {
            console.error('Error updating resource:', error);
            toast.error('Failed to update resource');
        }
    };



    return (
        <div className="max-w-3xl mx-auto p-6   rounded-md">
            <Toaster />
            <Typography variant="h4" className="text-center font-bold mb-6">
                Edit Resource
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
                <TextField label="Title" defaultValue={resource?.title} fullWidth className="bg-white" variant="outlined" {...register('title')} />
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
                        value={selectedLevel}  {...register('level')}
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
                        // value={resource?.topic}
                        value={selectedTopic}
                        variant="outlined"
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        // {...register('topic')}
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
                {contentType === 'text' && errors.content && <p className="text-red-500">{errors.content.message}</p>}
                {contentType === "image" && (
                    <div>
                        <Button
                            variant="contained" component="label"
                            className="bg-blue-500 text-white hover:bg-blue-700"
                        >
                            Upload Image
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </Button>
                        {content ? (
                            <div>
                                <Typography>{content.name}</Typography>
                                <img src={URL.createObjectURL(content)} alt="" className="mt-4 w-32" />
                            </div>
                        ) : resource?.content ? (
                            <div>
                                <Typography>Existing image</Typography>
                                <img src={resource?.content as string} alt="" className="mt-4 w-32" />
                            </div>
                        ) : null}
                        {errors.content && <p className="text-red-500">{errors.content.message}</p>}
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
                        {errors.content && <p className="text-red-500">{errors.content.message}</p>}
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
