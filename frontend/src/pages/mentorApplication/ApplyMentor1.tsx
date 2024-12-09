import React, { useEffect, useState } from 'react'
import visionLogo from '../../assets/auth/vison_logo_black.svg'
import Input from '@/components/Input'
import { TextField, Autocomplete, Box } from '@mui/material'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { countries } from '@/constants/countries';
import { getAllCategories } from '@/services/adminApi';


const applyMentorSchema = z.object({
    file: z.optional(z.any()),
    jobTitle: z.string().min(1, { message: "Job Title is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    company: z.string().optional(),
    experience: z.preprocess(
        (val) => (val !== null && val !== undefined ? parseFloat(val as string) : undefined),
        z.number().min(1, { message: "Experience is required" })
    ),
    skills: z
        .array(z.string().min(1, { message: "Skills are required" }))
        .min(1, { message: "At least one skill is required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
    socialMediaUrls: z.object({
        github: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Github URL" }).optional()),
        linkedin: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Linkedin URL" }).optional()),
        x: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid X URL" }).optional()),
        portfolio: z.preprocess(
            (val) => (val === '' ? undefined : val),
            z.string().url({ message: "Invalid Portfolio URL" }).optional()),
    }),
});

type applyMentorSchemaType = z.infer<typeof applyMentorSchema>;

type applyMentor1Props = {
    onNext: (data: any) => void;
}

const ApplyMentor1: React.FC<applyMentor1Props> = ({ onNext }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }


    const location = useLocation()
    const { email } = location.state
    console.log(email, 'email in apply mentor1 ');

    const navigate = useNavigate()

    const { register, handleSubmit, setValue, getValues, formState: { errors }, } = useForm<applyMentorSchemaType>({ resolver: zodResolver(applyMentorSchema) })


    useEffect(() => {
        console.log(getValues(), 'get values')
        console.log(errors, 'errrors');

    })


    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categories, setCategories] = useState()
    console.log(categories, 'categories in ----------');

    const [skills, setSkills] = useState<string[] | []>([])
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getAllCategories()
            console.log(response, 'response for getll categoruyeis');
            const categoriesData = response?.data.categories || [];
            setCategories(categoriesData);
        }
        fetchCategories()
    }, [])

    const handleCategoryChange = (event: any, value: string | null) => {
        console.log(value, 'value');

        setSelectedCategory(value)
        setValue("category", value || "");
        const category = categories.find((cat) => cat.name === value)
        if (category && category.skills) {
            setSkills(category.skills);
        } else {
            setSkills([]);
        }
    }

    const handleSkillsChange = (event: any, value: string[]) => {
        setValue("skills", value, { shouldValidate: true }); 
      };
    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
            <form onSubmit={handleSubmit(onNext)} encType='multipart/form-data' className='w-full max-w-6xl p-8  rounded-lg'>
                <div>
                    <div className='ms-2'>
                        <img src={visionLogo} alt="Vision Logo" />
                    </div>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h1 className='text-3xl font-semiboldbold'>Apply As A Mentor</h1>
                            <h5 className='m-4'>It will take only few minutes</h5>
                        </div>
                        <div>
                            <h4 className='text-3xl font-semibold'>1 of 2</h4>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-center mb-8'>
                    <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center'>
                        {imagePreview ? (
                            <img src={imagePreview} alt='Preview' className='w-full h-full rounded-full object-cover' />
                        ) : (
                            <span className='text-gray-400'>Image</span>
                        )}
                    </div>
                    <label className="block">
                        {/* <span className="sr-only">Choose profile photo</span> */}
                        <input type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                             file:bg-violet-50 file:text-violet-700
                             hover:file:bg-violet-100w" {...register("file")} onChange={handleFileChange} />
                    </label>
                    {/* <input type='file' className='ml-4 px-4 py-2 text-sm border rounded-md'{...register("file")}
                        onChange={handleFileChange} /> */}
                </div>



                {/* <div className='grid grid-cols-2 gap-4'> */}

                <div className='flex gap-4'>
                    <div className='w-full'>
                        <Input label='Job Title *' customClasses='w-full' {...register('jobTitle')} />
                        {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}
                    </div>

                    <div className='w-full mt-4'>
                        <Autocomplete disablePortal
                            options={categories?.map((category) => category.name)}
                            onChange={handleCategoryChange}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                        />
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    </div>

                </div>


                <div className='flex gap-4'>

                    <div className='w-full mt-4'>
                        <Autocomplete
                            id="country-select-demo"
                            className=''
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="20"
                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                            alt=""
                                        />
                                        {option.label} ({option.code}) +{option.phone}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Choose a country"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        },
                                    }}
                                />
                            )}
                            onChange={(event, value) => setValue("country", value?.label || "")}
                        />
                        {errors.country && <p className="text-red-500">{errors.country.message}</p>}

                    </div>
                    <div className='w-full'>
                        <Input label='Location *' customClasses='w-full ' {...register('location')} />

                        {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                    </div>


                </div>
                {/* </div> */}
                <div className='flex gap-4 mt-2'>
                    <div className='w-full'>
                        <TextField label="Company " helperText="optional" fullWidth   {...register('company')} />
                        {errors.company && <p className="text-red-500">{errors.company.message}</p>}

                    </div>

                    <div className='w-full'>

                        <TextField id="outlined-helperText" label="Experience" helperText="In year" fullWidth {...register('experience')} />
                        {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}

                    </div>
                </div>

                <div className='mt-3'>

                    <Autocomplete multiple id="tags-outlined" options={skills}
                        filterSelectedOptions
                        onChange={handleSkillsChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Skills" placeholder="Skills"/>
                        )}
                    />
                    {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}
                </div>
                <div className='mt-4'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Bio *"
                        multiline
                        rows={3} fullWidth {...register('bio')}
                    // defaultValue="Default Value"
                    />
                    {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
                </div>
                <div className='col-span-2 flex gap-2 items-center'>
                    <div className='w-full '>
                        <Input label="GitHub URL"  {...register('socialMediaUrls.github')} />
                        {errors?.socialMediaUrls?.github && (
                            <p className="text-red-500">{errors.socialMediaUrls.github.message}</p>
                        )}
                    </div>
                    <div className='w-full'>
                        <Input label="LinkedIn URL"  {...register('socialMediaUrls.linkedin')} />
                        {errors?.socialMediaUrls?.linkedin && (
                            <p className="text-red-500">{errors.socialMediaUrls.linkedin.message}</p>
                        )}
                    </div>
                    <div className='w-full'>
                        <Input label="Twitter/X URL"  {...register('socialMediaUrls.x')} />
                        {errors?.socialMediaUrls?.x && (
                            <p className="text-red-500">{errors.socialMediaUrls.x.message}</p>
                        )}
                    </div>
                    <div className='w-full'>
                        <Input label="Portfolio URL"  {...register('socialMediaUrls.portfolio')} />
                        {errors?.socialMediaUrls?.portfolio && (
                            <p className="text-red-500">{errors.socialMediaUrls.portfolio.message}</p>
                        )}
                    </div>

                </div>

                <button type='submit' className=' py-1 mt-2 px-5 text-purple-800 outline outline-offset-2 outline-purple-500 rounded-lg  '>Next</button>
            </form>
        </div>
    )
}

export default ApplyMentor1