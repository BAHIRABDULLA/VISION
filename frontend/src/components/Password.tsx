import React, { useState, forwardRef } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useId } from 'react';

interface PasswordInputProps {

    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    customClasses?: string
}

const Password = forwardRef<HTMLInputElement, PasswordInputProps>(({
    value, onChange, label = 'Password', customClasses,
    ...props }, ref) => {

    const uniqueId = useId()
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <FormControl className={customClasses} variant="outlined" margin="normal">
            <InputLabel htmlFor={uniqueId} >{label}</InputLabel>
            <OutlinedInput
                id={uniqueId}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                inputRef={ref}
                {...props}
            />
        </FormControl>
    )
});

export default Password