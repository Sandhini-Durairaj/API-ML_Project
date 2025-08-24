import React from "react";

import { FieldError, UseFormRegister } from "react-hook-form";

type Props = {
    label?: string;
    type: string;
    className?: string;
    name: string;
    errors?: { message: string };
    placeholder?: string;
    register?: UseFormRegister<any>;
    onchange?: any;
    value?: any;
    height?: boolean;
};

const Input: React.FC<Props> = ({
    label,
    type,
    className,
    name,
    placeholder,
    errors,
    register,
    value,
    height,
    onchange
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && <span className="mb-3 text-gray-600 font-thin  text-sm">{label}</span>}
            <input
                type={type}
                name={name}
                onChange={onchange}
                value={value}
                placeholder={placeholder}
                className={`w-full ${height ? 'py-1.5' : 'py-[8px]'} px-4 border border-gray-200 rounded-[5px] outline-none mt-2 focus:border-green-50 focus:ring-1 placeholder:text-sm focus:ring-green-400 transition-all duration-200 ease-in-out`}
            />

            {errors ? (
                <small className="col-span-2 text-red-500">{errors?.message}</small>
            ) : null}
        </div>
    );
};

export default Input;