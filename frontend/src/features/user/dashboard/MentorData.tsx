import { getAllCategories, updateMentorData } from "@/services/mentorApi";
import { mentorSchema, mentorSchemaType } from "@/utils/userValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface MentorDataProps {
    userData: mentorSchemaType | null;
}
interface CategorySchema {
    name: string;
    skills: string[]
}
const MentorData: React.FC<MentorDataProps> = ({ userData }) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<mentorSchemaType>({
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
            socialMediaUrls: {
                github: userData?.socialMediaUrls?.github,
                linkedin: userData?.socialMediaUrls?.linkedin,
                x: userData?.socialMediaUrls?.x,
                portfolio: userData?.socialMediaUrls?.portfolio,
            },
            // userData?.socialMediaUrls
        },
    });
    useEffect(() => {
        console.log(errors, "errors");
    }, []);

    /////////////////////////////////////////////////

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const [categories, setCategories] = useState<CategorySchema[]>([])
    const [skills, setSkills] = useState<string[] | []>([])

    useEffect(() => {
        if (userData) {
            setValue("jobTitle", userData.jobTitle || "");
            setValue("skills", userData.skills || []);
            setValue("location", userData.location || "");
            setValue("company", userData.company || "");
            setValue("category", userData.category || "");
            setValue("bio", userData.bio || "");
            setValue("whyBecomeMentor", userData.whyBecomeMentor || "");
            setValue("greatestAchievement", userData.greatestAchievement || "");
            setValue("socialMediaUrls.github", userData.socialMediaUrls.github || '');
            setValue("socialMediaUrls.linkedin", userData.socialMediaUrls.linkedin || '');
            setValue("socialMediaUrls.portfolio", userData.socialMediaUrls.portfolio || '');
            setValue("socialMediaUrls.x", userData.socialMediaUrls.x || '');
        }
    }, [userData, setValue]);


    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getAllCategories()
            const categoriesData = response?.data.response || [];
            setCategories(categoriesData);
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            const category = categories.find(cat => cat.name === selectedCategory)
            if (category && category.skills) {
                setSkills(category.skills)
            } else {
                setSkills([])
            }
        }
    }, [selectedCategory, categories])

    const handleCategoryChange = (_event: any, value: string | null) => {
        setSelectedCategory(value);
        setSelectedSkills([]); 
        setValue("category", value || "");
        setValue("skills", []);

        const category = categories.find(cat => cat.name === value);
        setSkills(category?.skills || []);
    };

    const handleSkillsChange = (_event: any, value: string[]) => {
        setSelectedSkills(value);
        setValue("skills", value, { shouldValidate: true });
    };

    ///////////////////////////////////////////

    const [isEditingMentorData, setIsEditingMentorData] = useState(false);

    const toggleEditJobToWebsite = () => {
        if (isEditingMentorData) {
            return;
        }
        setIsEditingMentorData(true);
    };

    const handleMentorDataSubmit = async (data: mentorSchemaType) => {
        try {
            console.log(data,'data in handle mentor data submit');
            
            const response = await updateMentorData(userData?._id!, data);
            if (response?.data.success) {
                toast.success(response.data.message);
                setIsEditingMentorData(false);
            } else {
                toast.error(response?.data.message);
            }
        } catch (error) {
            console.error("Error founded in handle mentor data submit", error);
            toast.error("Failed to update data.");
        }
    };
    return (
        <>
            {/* Job Title to Personal Website Section */}
            <form onSubmit={handleSubmit(handleMentorDataSubmit)}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <TextField
                            label="Job Title:"
                            defaultValue={userData?.jobTitle}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("jobTitle")}
                        />
                        {errors.jobTitle && (
                            <p className="text-red-500">{errors.jobTitle.message}</p>
                        )}
                    </div>
                    <div>
                        <TextField
                            label="Location:"
                            defaultValue={userData?.location}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("location")}
                        />
                        {errors.location && (
                            <p className="text-red-500">{errors.location.message}</p>
                        )}
                    </div>
                </div>

                {/* Additional fields for Job Title to Personal Website */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        {/* <TextField
                            label="Category:"
                            defaultValue={userData?.category || ""}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("category")}
                        /> */}
                        <Autocomplete
                            disablePortal
                            options={categories.map(category => category.name)}
                            value={selectedCategory || userData.category || null}
                            onChange={handleCategoryChange}
                            disabled={!isEditingMentorData}
                            renderInput={(params) => <TextField variant="filled"
                                fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                                {...params} label="Category" />}
                        />
                        {errors.category && (
                            <p className="text-red-500">{errors.category.message}</p>
                        )}
                    </div>
                    <div>
                        <TextField
                            label="Company  (optional):"
                            defaultValue={userData?.company || ""}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("company")}
                        />
                        {errors?.company && (
                            <p className="text-red-500">{errors?.company.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <TextField
                            label="Featured Article URL  (optional):"
                            defaultValue={userData?.featuredArticleUrl ?? ""}
                            {...register("featuredArticleUrl")}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                        />
                        {errors?.featuredArticleUrl && (
                            <p className="text-red-500">
                                {errors?.featuredArticleUrl.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <TextField
                            label="Introduction Video URL (optional)  :"
                            defaultValue={userData?.introductionVideoUrl || ""}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("introductionVideoUrl")}
                        />
                    </div>
                    {errors?.introductionVideoUrl && (
                        <p className="text-red-500">
                            {errors?.introductionVideoUrl.message}
                        </p>
                    )}
                </div>

                {/* skills */}
                <div className="mb-3">
                    {/* <TextField
                        label="Skills:"
                        defaultValue={userData?.skills || ""}
                        variant="filled"
                        fullWidth
                        multiline
                        sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        disabled={!isEditingMentorData}
                        {...register("skills")}
                    /> */}
                    <Autocomplete
                        multiple
                        id="skills-select"
                        options={skills}
                        value={selectedSkills.length > 0 ? selectedSkills : userData?.skills || []}
                        filterSelectedOptions
                        onChange={handleSkillsChange}
                        disabled={!isEditingMentorData}
                        renderInput={(params) => (
                            <TextField {...params} label="Skills" variant="filled"
                                fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "8px" }}
                                placeholder="Select skills" />
                        )}
                    />
                    {errors.skills && (
                        <p className="text-red-500">{errors.skills.message}</p>
                    )}
                </div>

                {/* Bio and Other Mentor-Specific Fields */}
                <div>
                    <TextField
                        label="Bio:"
                        defaultValue={userData?.bio || ""}
                        variant="filled"
                        fullWidth
                        {...register("bio")}
                        sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        maxRows={3}
                        multiline
                        disabled={!isEditingMentorData}
                    />
                    {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
                </div>
                <div className="mt-3">
                    <TextField
                        label="Why Become Mentor:"
                        defaultValue={userData?.whyBecomeMentor || ""}
                        variant="filled"
                        fullWidth
                        sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        maxRows={3}
                        multiline
                        disabled={!isEditingMentorData}
                        {...register("whyBecomeMentor")}
                    />
                    {errors.whyBecomeMentor && (
                        <p className="text-red-500">{errors.whyBecomeMentor.message}</p>
                    )}
                </div>
                <div className="mt-3">
                    <TextField
                        label="Greatest Achievement:"
                        defaultValue={userData?.greatestAchievement || ""}
                        variant="filled"
                        fullWidth
                        {...register("greatestAchievement")}
                        disabled={!isEditingMentorData}
                        sx={{ backgroundColor: "white", borderRadius: "8px" }}
                        maxRows={3}
                        multiline
                    />
                    {errors.greatestAchievement && (
                        <p className="text-red-500">{errors.greatestAchievement.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                        <TextField
                            label="GitHub URL (optional):"
                            defaultValue={userData?.socialMediaUrls?.github || ""}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("socialMediaUrls.github")}
                        />
                        {errors?.socialMediaUrls?.github && (
                            <p className="text-red-500">
                                {errors.socialMediaUrls.github.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <TextField
                            label="LinkedIn URL (optional):"
                            defaultValue={userData?.socialMediaUrls?.linkedin || ""}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("socialMediaUrls.linkedin")}
                        />
                        {errors?.socialMediaUrls?.linkedin && (
                            <p className="text-red-500">
                                {errors.socialMediaUrls.linkedin.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                        <TextField
                            label="Twitter/X URL (optional):"
                            defaultValue={userData?.socialMediaUrls?.x || ""}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("socialMediaUrls.x")}
                        />
                        {errors?.socialMediaUrls?.x && (
                            <p className="text-red-500">{errors.socialMediaUrls.x.message}</p>
                        )}
                    </div>
                    <div>
                        <TextField
                            label="Portfolio URL (optional):"
                            defaultValue={userData?.socialMediaUrls?.portfolio || ""}
                            variant="filled"
                            fullWidth
                            sx={{ backgroundColor: "white", borderRadius: "8px" }}
                            disabled={!isEditingMentorData}
                            {...register("socialMediaUrls.portfolio")}
                        />
                        {errors?.socialMediaUrls?.portfolio && (
                            <p className="text-red-500">
                                {errors.socialMediaUrls.portfolio.message}
                            </p>
                        )}
                    </div>
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
    );
};

export default MentorData;
