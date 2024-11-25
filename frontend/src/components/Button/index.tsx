import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	readonly children: React.ReactNode;
	readonly style?: React.CSSProperties;
	readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({
	onClick,
	style,
	children,
	className,
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={className}
			style={style}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
