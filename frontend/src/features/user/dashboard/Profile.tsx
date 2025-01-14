// src/pages/PersonalInformation.tsx

import toast, { Toaster } from 'react-hot-toast'

import { useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import { getSignedUrl, getUserDetails, passwordUpdate, updateCommonData } from '@/services/userApi';
import Loading from '@/components/Loading';
import { common, commonType, userSchemaType } from '@/utils/userValidator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MentorData from './MentorData';
import * as z from 'zod';
import axios from 'axios';



const passwordSchema = z.object({
    currentPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    newPassword: z.string()
        .min(8, { message: "New Password must be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "New Password must contain at least one letter" })
        .regex(/[0-9]/, { message: "New Password must contain at least one number" }),
    confirmPassword: z.string()
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"]
    })

type passwordSchemaType = z.infer<typeof passwordSchema>


const Profile = () => {


    const [userData, setUserData] = useState<userSchemaType | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null)

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isEditingCommonData, setIsEditingCommonData] = useState(false);
    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    const [filekey, setFileKey] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false)

    const toggleEditNameEmail = () => setIsEditingCommonData(!isEditingCommonData);
    const togglePasswordChange = () => setShowPasswordChange(!showPasswordChange);


    const { register: passwordRegister, handleSubmit: passowrdHandleSubmit,
        formState: { errors: passwordError }, reset } = useForm<passwordSchemaType>({ resolver: zodResolver(passwordSchema) })


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails()
                setUserData(userDetails.data)
                if (!selectedFile) {
                    if (userDetails.data?.profile && userDetails.data.profile !== 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png') {
                        const filePath = userDetails.data.profile; 
                        const fileType = getFileTypeFromUrl(filePath);

                       
                        const response = await getSignedUrl(filePath, fileType);

                        if (response?.status === 200) {
                            const { signedUrl } = response.data;
                            setImagePreview(signedUrl); 
                        }
                    }
                }
            } catch (error) {
                console.error('Error founded in user details', error);
            } finally {
                setLoading(false)
            }
        }
        fetchUserDetails()
        console.log(selectedFile, 'selected file');

    }, [])
    const getFileTypeFromUrl = (url) => {
        const fileExtension = url.split('.').pop();
        switch (fileExtension.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            default:
                return 'application/octet-stream';
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);
    // console.log(userData, 'userData ');
    const { register, handleSubmit, formState: { errors } } = useForm<commonType>({
        resolver: zodResolver(common),
        defaultValues: {
            fullName: userData?.fullName
        }
    })

    // const toggleEditJobToWebsite = () => setIsEditingMentorData(!isEditingMentorData);


    const handleCancel = () => {
        reset()
        setShowPasswordChange(false)
    }

    const handleUpdatePassword = async (data: object) => {
        try {
            console.log(data, 'data');
            await passwordSchema.parseAsync(data)
            const response = await passwordUpdate(data)
            console.log("Password updated successfully", response);
            if (response?.data.success) {
                toast.success(response?.data.message)
                setShowPasswordChange(false)

            } else {
                toast.error(response?.data.message)
            }
        } catch (err) {
            toast.error("Failed to update password");
            console.error('Error founed in update password ', err);
        }
    }

    const handleChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setImagePreview(URL.createObjectURL(file))

            generateSignedUrl(file)

        }
    }
    const generateSignedUrl = async (file: File) => {
        try {
            const response = await getSignedUrl(`profile/${Date.now()}_${file.name}`, file.type)
            console.log(response, 'response in Profile .tsx');
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
    useEffect(() => {
        console.log(errors, 'errors');

    }, [errors])
    const handleCommonDataSubmit = async (data: commonType) => {
        try {
            let uploadedFileKey = filekey;
            if (selectedFile && signedUrl) {
                console.log(selectedFile, 'selected file in common data submit');

                setUploading(true);
                await axios.put(signedUrl, selectedFile, {
                    headers: { 'Content-Type': selectedFile.type },
                });
                setUploading(false);
                uploadedFileKey = filekey;
                data.fileKey = uploadedFileKey;
            }

            // const formData = new FormData();
            console.log(data, 'data in common data submit');

            // formData.append('fullName', data.fullName);
            // if (uploadedFileKey) formData.append('fileKey', uploadedFileKey);

            const response = await updateCommonData(data);
            if (response?.data.success) {
                toast.success("Data updated successfully.");
                setIsEditingCommonData(false);
            } else {
                toast.error("Failed to update data.");
            }
        } catch (error) {
            console.error('Error updating common data:', error);
            toast.error("An error occurred while saving changes.");
            setUploading(false);
        }
    };



    const [showPasswordChange, setShowPasswordChange] = useState(false);

    if (!userData) {
        return <Loading />
    }

    if (loading) {
        return <Loading />
    }


    return (
        <div className="p-6 mt-9 bg-gray-600  rounded-lg shadow-md text-white max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Personal Information</h2>
            <Toaster />
            {/* Profile Picture Section */}
            <form key={1} onSubmit={handleSubmit(handleCommonDataSubmit)} >
                <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 bg-white rounded-full mb-4 flex items-center justify-center text-gray-400">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <span>No Image</span>
                        )}
                    </div>
                    <input
                        type="file" onChange={handleChange}
                        accept="image/*" hidden={!isEditingCommonData}
                        className={`w-full p-2 text-black rounded-md ${!isEditingCommonData ? 'hidden' : 'block'}`}
                    />
                </div>

                {/* Full Name & Email Section */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <TextField
                            label="Full Name" defaultValue={userData?.fullName || ''} variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px", }} disabled={!isEditingCommonData}
                            {...register('fullName')}
                        />
                        {errors.fullName && <p className='text-red-500'>{errors.fullName.message}</p>}

                    </div>
                    <div>
                        <TextField
                            label="Email" defaultValue={userData?.email} disabled variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        />

                    </div>
                </div>
                <div className='flex gap-4'>

                    {isEditingCommonData ? (
                        <div className='flex gap-2'>
                            <button type='submit' disabled={uploading} className='bg-slate-400 px-7 py-1 rounded-md text-white mb-6'
                            >save</button>
                            <button className='bg-slate-400 px-7 py-1 rounded-md text-white mb-6'
                                type='button' onClick={toggleEditNameEmail}>Cancel</button>
                        </div>
                    ) : (
                        <button onClick={toggleEditNameEmail} className='bg-slate-400 px-7 py-1 rounded-md text-white mb-6'>edit</button>
                    )}
                </div>

            </form>

            {userData?.role === 'mentor' && (
                <MentorData userData={userData} />
            )}


            {/* Password Change Section */}
            <div className="mt-6">
                <button
                    className="bg-blue-600 px-4 py-2 rounded-md text-white"
                    onClick={togglePasswordChange}
                >
                    Change Password
                </button>

                {showPasswordChange && (
                    <form onSubmit={passowrdHandleSubmit(handleUpdatePassword)}>
                        <div className="mt-4">
                            <TextField
                                label="Current Password:" {...passwordRegister('currentPassword')}
                                variant="filled" fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            />
                            {passwordError.currentPassword && <p className='text-red-600'>{passwordError.currentPassword.message}</p>}

                            <div className="grid grid-cols-2 gap-4 mt-3 mb-6">
                                <div>
                                    <TextField
                                        label="New Password:"
                                        variant="filled" fullWidth {...passwordRegister('newPassword')}
                                        sx={{ backgroundColor: "white", borderRadius: "8px" }}
                                    />
                                    {passwordError.newPassword && <p className='text-red-600'>{passwordError.newPassword.message}</p>}

                                </div>
                                <div>
                                    <TextField
                                        label="Confirm New Password:"  {...passwordRegister('confirmPassword')}
                                        variant="filled" fullWidth
                                        sx={{ backgroundColor: "white", borderRadius: "8px" }}

                                    />
                                    {passwordError.confirmPassword && <p className='text-red-600'>{passwordError.confirmPassword.message}</p>}

                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <button type='submit' className="bg-gray-400 text-white px-4 py-2 rounded-md ">
                                    Update Password
                                </button>
                                <button type='button' onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded-md ">
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
