import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  customClasses?: string;
  type?:'button'|'submit'|'reset'
}

const Button: React.FC<ButtonProps> = ({ text, onClick, customClasses ,type='button'}) => {
  return (
    <button type={type} onClick={onClick} className={`py-3 px-6  rounded-lg text-white font-semibold ${customClasses}`}>
      {text}
    </button>
  );
};

export default Button;
