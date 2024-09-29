import { TextField } from '@mui/material';
import React,{forwardRef} from 'react';

interface InputProps {
  label:string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customClasses?:string;
  variant?:'filled' | 'outlined' | 'standard';
  margin?:'none'|'dense'|'normal'
}

const Input =forwardRef<HTMLInputElement,InputProps> ( ({label, type='text',value, onChange,
   customClasses,variant='outlined' ,margin='normal',...props },ref) => {
  return (
    <TextField
      className={customClasses}
      label={label}
      type={type}
      value={value}
      variant={variant}
      margin={margin}
      onChange={onChange}
      inputRef={ref}
      {...props}
    />
  );
});

export default Input;
