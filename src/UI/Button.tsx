import React from 'react';

type ButtonProps = {
    textContent: string;
    className: string;
    type: "button" | "submit" | "reset";
    onClickHandler?: () => void;
    isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ textContent, className, type, onClickHandler, isDisabled }) => {
    return (
        <button
            className={className}
            type={type}
            onClick={onClickHandler}
            disabled={isDisabled}
        >
            {textContent}
        </button>
    );
}

export default Button;