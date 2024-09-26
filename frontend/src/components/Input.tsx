import { TextField } from '@mui/material';
import React from 'react';

interface InputProps {
  label:string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customClasses?:string;
  variant?:'filled' | 'outlined' | 'standard';
  margin?:'none'|'dense'|'normal'
}

const Input: React.FC<InputProps> = ({label, type='text',value, onChange,
   customClasses,variant='outlined' ,margin='normal' }) => {
  return (
    <TextField
      className={customClasses}
      label={label}
      type={type}
      value={value}
      variant={variant}
      margin={margin}
      onChange={onChange}
    />
  );
};

export default Input;
