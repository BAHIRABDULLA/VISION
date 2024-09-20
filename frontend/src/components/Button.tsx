import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  customClasses?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, customClasses }) => {
  return (
    <button onClick={onClick} className={`py-3 px-6 rounded-lg text-white font-semibold ${customClasses}`}>
      {text}
    </button>
  );
};

export default Button;
