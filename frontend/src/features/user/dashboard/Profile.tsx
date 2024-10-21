// src/pages/PersonalInformation.tsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import Input from '@/components/Input';
import { TextField } from '@mui/material';


interface PersonalInformationProps {
    role: 'mentor' | 'mentee';
}

const Profile: React.FC<PersonalInformationProps> = ({ role }) => {


    const [isEditingNameEmail, setIsEditingNameEmail] = useState(false);
    const [isEditingJobToWebsite, setIsEditingJobToWebsite] = useState(false);
    const user = useSelector((state: RootState) =>
        role === 'mentee' ? state.menteeAuth.user : state.mentorAuth.user
    );
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toggleEditNameEmail = () => setIsEditingNameEmail(!isEditingNameEmail);
    const toggleEditJobToWebsite = () => setIsEditingJobToWebsite(!isEditingJobToWebsite);
    const togglePasswordChange = () => setShowPasswordChange(!showPasswordChange);
    return (
        <div className="p-6 bg-gray-600 rounded-lg shadow-md text-white max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Personal Information</h2>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-gray-600 rounded-full mb-4 flex items-center justify-center text-gray-400">
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
                        sx={{ backgroundColor: "white", }}
                    />
                </div>
                <div>
                    <TextField
                        label="Email" defaultValue="john.doe@example.com" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", }}
                    />

                </div>
            </div>

            <button
                className="bg-purple-600 px-4 py-2 rounded-md text-white mb-6"
                onClick={toggleEditNameEmail}
            >
                {isEditingNameEmail ? 'Save' : 'Edit'}
            </button>

            {/* Job Title to Personal Website Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <TextField
                        label="Job Title:" defaultValue="Software Engineer" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", }}
                    />

                </div>
                <div>
                    <TextField
                        label="Location:" defaultValue="New York, USA" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", }}
                    />
                </div>
            </div>

            {/* Additional fields for Job Title to Personal Website */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <TextField
                        label="Category:" defaultValue="Web Development" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", }}
                    />
                </div>
                <div>
                    <TextField
                        label="Company:" defaultValue="Tech Corp" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <TextField
                        label="Featured Article URL:   (optional)" defaultValue="" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", }}
                    />
                </div>
                <div>
                    <TextField
                        label="Introduction Video URL:   (optional)" defaultValue="" variant="filled" fullWidth
                        sx={{ backgroundColor: "white", }}
                    />
                </div>
            </div>

            {/* Bio and Other Mentor-Specific Fields */}
            <div>
                <TextField
                    label="Bio:" defaultValue="I am a passionate software developer..." variant="filled" fullWidth
                    sx={{ backgroundColor: "white", }} maxRows={3} multiline
                />

            </div>
            <div className='mt-3'>
                <TextField
                    label="Bio:" defaultValue="I am a passionate software developer..." variant="filled" fullWidth
                    sx={{ backgroundColor: "white", }} maxRows={3} multiline
                />
            </div>

            <button
                className="bg-purple-600 px-4 py-2 rounded-md text-white mt-6"
                onClick={toggleEditJobToWebsite}
            >
                {isEditingJobToWebsite ? 'Save' : 'Edit'}
            </button>

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
                        <label className="block mb-2">Current Password:</label>
                        <input
                            type="password"
                            className="w-full p-2 rounded-md text-black"
                        />
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block mb-2 font-semibold">New Password:</label>
                                <input
                                    type="password"
                                    className="w-full p-2 rounded-md text-black"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold">Confirm New Password:</label>
                                <input
                                    type="password"
                                    className="w-full p-2 rounded-md text-black"
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
