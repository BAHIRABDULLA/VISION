import { TextField } from '@mui/material';
import React,{forwardRef} from 'react';

interface InputProps {
  label:string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customClasses?:string;
  variant?:'filled' | 'outlined' | 'standard';
  margin?:'none'|'dense'|'normal',
  defaultValue?:string | number
}

const Input =forwardRef<HTMLInputElement,InputProps> ( ({label, type='text', onChange, 
   customClasses,variant='outlined' ,value,margin='normal',defaultValue,...props },ref) => {
  return (
    <TextField
      className={customClasses}
      label={label}
      type={type}
      // value={value}
      variant={variant}
      margin={margin}
      onChange={onChange}
      inputRef={ref}
      {...(value !== undefined ?{value}:{defaultValue})}
      {...props}
    />
  );
});

export default Input;
