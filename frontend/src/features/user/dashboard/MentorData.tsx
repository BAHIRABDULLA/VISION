import React, { useEffect, useState } from 'react'
import { common, commonType, mentorSchema, mentorSchemaType, userSchema, userSchemaType } from '@/utils/userValidator';
import { updateMentorData } from '@/services/mentorApi';
import { Avatar, Skeleton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast'




interface MentorDataProps {
    userData: mentorSchemaType | null;
}

const MentorData: React.FC<MentorDataProps> = ({ userData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<mentorSchemaType>({
        resolver: zodResolver(mentorSchema),
        defaultValues: {
            jobTitle: userData?.jobTitle,
            skills: userData?.skills,
            location: userData?.location,
            company: userData?.company,
            category: userData?.category,
            featuredArticleUrl: userData?.featuredArticleUrl,
            bio: userData?.bio,
            whyBecomeMentor: userData?.whyBecomeMentor,
            greatestAchievement: userData?.greatestAchievement,
            socialMediaUrl: userData?.socialMediaUrl

        }
    })
    const [isEditingMentorData, setIsEditingMentorData] = useState(false);

    const toggleEditJobToWebsite = () => {
        if (isEditingMentorData) {
            return;
        }
        setIsEditingMentorData(true);
    };


    const handleMentorDataSubmit = async (data: mentorSchemaType) => {
        console.log('submiting mentor data ');
        try {
            const response = await updateMentorData(userData?._id!, data)
            if(response?.data.sucess){
                toast.success(response.data.message)
                setIsEditingMentorData(false);
            }else{
                toast.error(response?.data.message)
            }
        } catch (error) {
            console.error('Error founded in handle mentor data submit', error);
            toast.error("Failed to update data.");
        }
    }
    return (
        <>
            {/* Job Title to Personal Website Section */}
            <form onSubmit={handleSubmit(handleMentorDataSubmit)}>


                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <TextField
                            label="Job Title:" defaultValue={userData?.jobTitle} variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }} disabled={!isEditingMentorData} {...register('jobTitle')}
                        />
                        {errors.jobTitle && <p className='text-red-500'>{errors.jobTitle.message}</p>}


                    </div>
                    <div>
                        <TextField
                            label="Location:" defaultValue={userData?.location} variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }} disabled={!isEditingMentorData} {...register('location')}
                        />
                        {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>

                </div>

                {/* Additional fields for Job Title to Personal Website */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <TextField
                            label="Category:" defaultValue={userData?.category || ''} variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }} disabled={!isEditingMentorData} {...register('category')}
                        />
                        {errors.category && <p className='text-red-500'>{errors.category.message}</p>}

                    </div>
                    <div>
                        <TextField
                            label="Company:" defaultValue={userData?.company || ""} variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }} disabled={!isEditingMentorData} {...register('company')}
                        />
                        {errors?.company && <p className='text-red-500'>{errors?.company.message}</p>}

                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <TextField
                            label="Featured Article URL  (optional):"
                            defaultValue={userData?.featuredArticleUrl ?? ''} {...register('featuredArticleUrl')}
                            variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }} disabled={!isEditingMentorData}
                        />
                        {errors?.featuredArticleUrl && <p className='text-red-500'>{errors?.featuredArticleUrl.message}</p>}

                    </div>
                    <div>
                        <TextField
                            label="Introduction Video URL (optional)  :" defaultValue={userData?.introductionVideoUrl || ''} variant="filled" fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }} disabled={!isEditingMentorData}
                            {...register('introductionVideoUrl')}
                        />
                    </div>
                    {errors?.introductionVideoUrl && <p className='text-red-500'>{errors?.introductionVideoUrl.message}</p>}

                </div>

                {/* Bio and Other Mentor-Specific Fields */}
                <div>
                    <TextField
                        label="Bio:" defaultValue={userData?.bio || ''} variant="filled" fullWidth {...register('bio')}
                        sx={{ backgroundColor: "white", borderRadius: "8px" }} maxRows={3} multiline disabled={!isEditingMentorData}
                    />
                    {errors.bio && <p className='text-red-500'>{errors.bio.message}</p>}


                </div>
                <div className='mt-3'>
                    <TextField
                        label="Why Become Mentor:" defaultValue={userData?.whyBecomeMentor || ''} variant="filled" fullWidth
                        sx={{ backgroundColor: "white", borderRadius: "8px" }} maxRows={3} multiline disabled={!isEditingMentorData}
                        {...register('whyBecomeMentor')}
                    />
                    {errors.whyBecomeMentor && <p className='text-red-500'>{errors.whyBecomeMentor.message}</p>}

                </div>
                <div className='mt-3'>
                    <TextField
                        label="Greatest Achievement:" defaultValue={userData?.greatestAchievement || ''} variant="filled" fullWidth
                        {...register('greatestAchievement')} disabled={!isEditingMentorData}
                        sx={{ backgroundColor: "white", borderRadius: "8px" }} maxRows={3} multiline
                    />
                    {errors.greatestAchievement && <p className='text-red-500'>{errors.greatestAchievement.message}</p>}

                </div>
                {/* <button
                    className={`px-7 py-1 rounded-md text-white mt-6 ${isEditingMentorData ? 'bg-blue-500' :'bg-slate-400' 
                        }`}
                    onClick={toggleEditJobToWebsite}
                    type={`${isEditingMentorData ? 'submit':'button'}`}
                >
                    {isEditingMentorData ? 'Save' : 'Edit'}
                </button> */}

                {isEditingMentorData ? (
                    <button
                        className="bg-blue-500 px-7 py-1 rounded-md text-white mt-6"
                        type="submit"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="bg-slate-400 px-7 py-1 rounded-md text-white mt-6"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleEditJobToWebsite();
                        }}
                        type="button"
                    >
                        Edit
                    </button>
                )}
            </form>
        </>
    )
}

export default MentorData