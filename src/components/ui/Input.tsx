import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	className?: string;
};

const Input = ({ label, className = '', ...props }: InputProps) => {
	return (
		<div className={`flex flex-col ${className}`}>
			{label && <label className="text-sm text-gray-300 mb-1">{label}</label>}
			<input
				{...props}
				className="bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
			/>
		</div>
	);
};

export default Input;
