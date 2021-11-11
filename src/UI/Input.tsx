import React, { LegacyRef } from 'react';

type InputProps = {
    type?: "text" | "email" | "number" | "password";
    placeholder: string;
    name: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    value?: string | number;
    className?: string;
    defaultValue?: string | number;
    ref?: LegacyRef<HTMLInputElement>
}

const Input: React.FC<InputProps> = React.forwardRef(({ type, placeholder, name, onChange, value, className, defaultValue }, ref) => {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            ref={ref}
        />
    );
})

export default Input;