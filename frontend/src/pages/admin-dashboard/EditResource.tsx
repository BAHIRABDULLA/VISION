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
    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    const [fileKey, setFileKey] = useState<string | null>(null);
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

    const generateSignedUrl = async (file: File) => {
        try {
            const response = await getSignedUrl(`${Date.now()}_${file.name}`, file.type);
            if (response?.status && response.status === 200) {
                const { signedUrl, key } = response.data;
                setSignedUrl(signedUrl);
                setFileKey(key);
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
            console.log(response, 'response in edit resource');

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

    const onSubmit = async (data: resourceSchemaType) => {
        try {
            if (contentType !== 'text' && content) {
                // Only generate signed URL and upload if there's a new file
                await generateSignedUrl(content);
                if (signedUrl) {
                    await uploadFileToS3(content, signedUrl);
                    data.content = fileKey;
                }
            }
            console.log(data.course, 'data.course');

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

            // If it's a text content or no new file was uploaded, use the existing content
            if (contentType === 'text' || !content) {
                formData.append("content", data.content as string);
            } else {
                formData.append("content", fileKey || '');
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
                Add Resource
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
