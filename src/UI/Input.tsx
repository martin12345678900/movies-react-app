import React, { ChangeEventHandler, LegacyRef } from 'react';

type InputProps = {
    type?: "password" | "email" | "text" | "number";
    placeholder: string;
    name?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>
    value?: string | number;
    defaultValue?: string;
    ref?: LegacyRef<HTMLInputElement>;
    className?: string;
    id?: string;
}


const Input: React.FC<InputProps> = React.forwardRef(({ type, placeholder, name, onChange, id, value, defaultValue, className }, ref) => {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            id={id}
            ref={ref}
        />
    );
})

export default Input;