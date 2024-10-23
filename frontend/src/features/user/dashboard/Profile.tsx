// src/pages/PersonalInformation.tsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

import { TextField } from '@mui/material';
import { getUserDetails } from '@/services/userApi';


interface PersonalInformationProps {
    role: 'mentor' | 'mentee';
}

const Profile: React.FC<PersonalInformationProps> = ({ role }) => {


    useEffect(() => {
        
        const userDetails = async () => {
           const response =  await getUserDetails()
           console.log(response,'Profile session response +++++++++');
           
        }
        userDetails()
    }, [])

    const [isEditingNameEmail, setIsEditingNameEmail] = useState(false);
    const [isEditingJobToWebsite, setIsEditingJobToWebsite] = useState(false);
    const user = useSelector((state: RootState) =>
        role === 'mentee' ? state.menteeAuth.user : state.mentorAuth.user
    );

    const [showPasswordChange, setShowPasswordChange] = useState(false);


    const toggleEditNameEmail = () => setIsEditingNameEmail(!isEditingNameEmail);
    const toggleEditJobToWebsite = () => setIsEditingJobToWebsite(!isEditingJobToWebsite);
    const togglePasswordChange = () => setShowPasswordChange(!showPasswordChange);
    return (
        <div className="p-6 bg-gray-600 rounded-lg shadow-md text-white max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Personal Information</h2>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-white rounded-full mb-4 flex items-center justify-center text-gray-400">
                    No Image
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="block w-full p-2 text-black rounded-md"
                />
            </div>

            {/* Full Name & Email Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>

                    <TextField
                        label="Full Name" defaultValue="John Doe" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", borderRadius: "8px" }}
                    />
                </div>
                <div>
                    <TextField
                        label="Email" defaultValue="john.doe@example.com" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", borderRadius: "8px" }}
                    />

                </div>
            </div>

            <button
                className="bg-slate-400 px-7 py-1 rounded-md text-white mb-6"
                onClick={toggleEditNameEmail}
            >
                {isEditingNameEmail ? 'Save' : 'Edit'}
            </button>



            {role === 'mentor' && (
                <>
                    {/* Job Title to Personal Website Section */}

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <TextField
                                label="Job Title:" defaultValue="Software Engineer" variant="filled" fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            />

                        </div>
                        <div>
                            <TextField
                                label="Location:" defaultValue="New York, USA" variant="filled" fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            />
                        </div>
                    </div>

                    {/* Additional fields for Job Title to Personal Website */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <TextField
                                label="Category:" defaultValue="Web Development" variant="filled" fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Company:" defaultValue="Tech Corp" variant="filled" fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <TextField
                                label="Featured Article URL  (optional) :" defaultValue="" variant="filled" fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Introduction Video URL (optional)  :" defaultValue="" variant="filled" fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            />
                        </div>
                    </div>

                    {/* Bio and Other Mentor-Specific Fields */}
                    <div>
                        <TextField
                            label="Bio:" defaultValue="I am a passionate software developer..." variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }} maxRows={3} multiline
                        />

                    </div>
                    <div className='mt-3'>
                        <TextField
                            label="Bio:" defaultValue="I am a passionate software developer..." variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }} maxRows={3} multiline
                        />
                    </div>

                    <button
                        className="bg-slate-400  px-7 py-1 rounded-md text-white mt-6"
                        onClick={toggleEditJobToWebsite}
                    >
                        {isEditingJobToWebsite ? 'Save' : 'Edit'}
                    </button>
                </>
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
                    <div className="mt-4">
                        <TextField
                            label="Current Password:" defaultValue="" variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        />
                        {/* <label className="block mb-2">Current Password:</label>
                        <input
                            type="password"
                            className="w-full p-2 rounded-md text-black"
                        /> */}
                        <div className="grid grid-cols-2 gap-4 mt-3 mb-6">
                            <div>
                                <TextField
                                    label="New Password:" defaultValue="" variant="filled" fullWidth
                                    sx={{ backgroundColor: "white", borderRadius: "8px" }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Confirm New Password:" defaultValue="" variant="filled" fullWidth
                                    sx={{ backgroundColor: "white", borderRadius: "8px" }}
                                />
                            </div>
                        </div>
                        <button className="bg-green-600 px-4 py-2 rounded-md text-white">
                            Update Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
