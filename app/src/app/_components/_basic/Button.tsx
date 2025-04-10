interface ButtonProps {
    className?: string
    type?: "button" | "submit" | "reset"
    color?: string
    disabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    className,
    type = "button",
    color = "bg-slate-700 hover:bg-slate-600 text-slate-200",
    disabled = false
}) => {

    return (
        <button
            type={type}
            disabled={disabled}
            className={`py-2 px-4 text-semibold rounded-4xl ${color} ${className}`}
            onClick={onClick}>
            {children}
        </button>
    );
}