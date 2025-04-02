"use client";
import React from "react";

// Define a TypeScript interface for the props
interface InputSpaceProps {
	type: string;
	value: string;
	placeholder: string;
	onChange: (value: string) => void;
}

// Define the Input component
const InputSpace = ({ type, value, placeholder, onChange }: InputSpaceProps) => {
	return (
		<div className="w-full">
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primaryBgClr focus:border-transparent transition-all duration-300 text-sm sm:text-base"
			/>
		</div>
	);
};

export default InputSpace;
