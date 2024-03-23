import React from 'react';

// Define a TypeScript interface for the props
interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

// Define the Input component
const InputSpace: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input className='pb-1 text-sm px-3 pt-3 border-b border-black outline-none bg-gray-100'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputSpace;
