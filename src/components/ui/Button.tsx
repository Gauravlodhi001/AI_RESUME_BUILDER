import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'ghost' | 'outline';
	className?: string;
};

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
	const base = 'px-4 py-2 rounded-md font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
	const variantCls =
		variant === 'ghost'
			? 'bg-transparent text-white hover:bg-white/5'
			: variant === 'outline'
			? 'border border-white/20 text-white'
			: 'bg-blue-500 text-white hover:bg-blue-600';

	return (
		<button className={`${base} ${variantCls} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
