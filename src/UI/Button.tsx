import React from 'react';

export type ButtonProps = {
    type?: "submit" | "button" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    textContent: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, disabled, textContent, className }) => {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {textContent}
        </button>
    );
}

export default Button;