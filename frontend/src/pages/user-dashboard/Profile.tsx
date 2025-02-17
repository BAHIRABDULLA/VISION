// src/pages/PersonalInformation.tsx

import toast, { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/services/userApi';
import Loading from '@/components/Loading';
import { userSchemaType } from '@/utils/userValidator';
import MentorData from '@/features/user/dashboard/MentorData';
import ChangePassword from '@/features/user/dashboard/ChangePassword';
import CommonProfile from '@/features/user/dashboard/CommonProfile';


const Profile = () => {

    const [userData, setUserData] = useState<userSchemaType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails()
                if (userDetails.status >= 400) {
                    console.log(userDetails, 'user deta')
                    throw new Error(userDetails?.data?.message || "An error occurred, please try again later");

                }
                setUserData(userDetails.data)

            } catch (error) {
                console.error('Error founded in user details', error);
                toast.error(error.message || "Something went wrong");

            } finally {
                setLoading(false)
            }
        }
        fetchUserDetails()
    }, [])

    if (!userData && loading) {
        return <Loading />
    }

    return (
        <div className="mt-9">
            <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Personal Information</h2>
            <Toaster />
            <div className='p-6 mt-9 bg-gray-300 dark:bg-gray-600 rounded-lg shadow-md text-gray-900 dark:text-white max-w-4xl mx-auto'>
                {/* Profile Picture Section */}
                {userData && <CommonProfile userData={userData} />}

                {/* Mentor data section */}
                {userData?.role === 'mentor' && <MentorData userData={userData} />}

                {/* Password Change Section */}
                <ChangePassword />
            </div>
        </div>
    );
};

export default Profile;
