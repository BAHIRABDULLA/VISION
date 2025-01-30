import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { TextField } from '@mui/material';
import { passwordUpdate } from '@/services/userApi';



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


const ChangePassword = () => {

    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const togglePasswordChange = () => setShowPasswordChange(!showPasswordChange);

    const { register: passwordRegister, handleSubmit: passowrdHandleSubmit,
        formState: { errors: passwordError }, reset } = useForm<passwordSchemaType>({ resolver: zodResolver(passwordSchema) })


    const handleUpdatePassword = async (data: object) => {
        try {
            await passwordSchema.parseAsync(data)
            const response = await passwordUpdate(data)
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

    const handleCancel = () => {
        reset()
        setShowPasswordChange(false)
    }

    return (
        <div className="mt-6">
            <button
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2 rounded-md text-white"
                onClick={togglePasswordChange}
            >
                Change Password
            </button>

            {showPasswordChange && (
                <form onSubmit={passowrdHandleSubmit(handleUpdatePassword)}>
                    <div className="mt-4">
                        <TextField
                            label="Current Password"
                            {...passwordRegister('currentPassword')}
                            variant="filled"
                            fullWidth
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                            }}
                        />
                        {passwordError.currentPassword && (
                            <p className="text-red-500">{passwordError.currentPassword.message}</p>
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-3 mb-6">
                            <div>
                                <TextField
                                    label="New Password"
                                    variant="filled"
                                    fullWidth
                                    {...passwordRegister('newPassword')}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                    }}
                                />
                                {passwordError.newPassword && (
                                    <p className="text-red-500">{passwordError.newPassword.message}</p>
                                )}
                            </div>
                            <div>
                                <TextField
                                    label="Confirm New Password"
                                    variant="filled"
                                    fullWidth
                                    {...passwordRegister('confirmPassword')}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                    }}
                                />
                                {passwordError.confirmPassword && (
                                    <p className="text-red-500">{passwordError.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-gray-500 dark:bg-gray-700 text-white px-4 py-2 rounded-md"
                            >
                                Update Password
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-500 dark:bg-gray-700 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ChangePassword