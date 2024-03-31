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
    <input className='py-4 px-3 w-96 outline-none border rounded-3xl'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputSpace;
