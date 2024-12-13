// src/pages/PersonalInformation.tsx

import toast, { Toaster } from 'react-hot-toast'

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Avatar, Skeleton, TextField } from '@mui/material';
import { getUserDetails, passwordUpdate, updateCommonData } from '@/services/userApi';
import Loading from '@/components/Loading';
import { common, commonType, mentorSchema, mentorSchemaType, userSchema, userSchemaType } from '@/utils/userValidator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import MentorData from './MentorData';
import * as z from 'zod';



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


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails()
                setUserData(userDetails.data)
                if (!selectedFile) {
                    setImagePreview(userDetails.data?.profile || '');
                }
            } catch (error) {
                console.error('Error founded in user details', error);
            } finally {
                setLoading(false)
            }
        }
        fetchUserDetails()
    }, [])
    console.log(userData, 'userData ');
    const { register, handleSubmit, formState: { errors } } = useForm<commonType>({
        resolver: zodResolver(common),
        defaultValues: {
            fullName: userData?.fullName
        }
    })
    const { register: passwordRegister, handleSubmit: passowrdHandleSubmit,
        formState: { errors: passwordError }, reset } = useForm<passwordSchemaType>({ resolver: zodResolver(passwordSchema) })

    const [loading, setLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [error, setError] = useState('')

    const [isEditingCommonData, setIsEditingCommonData] = useState(false);

    const toggleEditNameEmail = () => setIsEditingCommonData(!isEditingCommonData);
    const togglePasswordChange = () => setShowPasswordChange(!showPasswordChange);
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
        }
    }
    


    const handleCommonDataSubmit = async (data: commonType) => {
        console.log('its enter here');

        try {
            const formData = new FormData()
            formData.append('fullName', data.fullName)
            console.log(selectedFile, 'seelcted file');

            if (selectedFile) {
                formData.append('file', selectedFile)
            }

            const response = await updateCommonData(formData)
            console.log(response, 'response in Profile .tsx');

            if (response?.data.success) {
                toast.success("Data updated")
                setIsEditingCommonData(!isEditingCommonData)
            }
        } catch (error) {
            console.error('Error founded in common data saving', error);
        }
    }


    const [showPasswordChange, setShowPasswordChange] = useState(false);

    if (loading) {
        return <Loading />
    }


    return (
        <div className="p-6 bg-gray-600  rounded-lg shadow-md text-white max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Personal Information</h2>
            <Toaster />
            {/* Profile Picture Section */}
            <form key={1} onSubmit={handleSubmit(handleCommonDataSubmit)} encType="multipart/form-data">
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
                            label="Full Name" defaultValue={userData?.fullName} variant="filled" fullWidth
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
                            <button type='submit' className='bg-slate-400 px-7 py-1 rounded-md text-white mb-6'
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
