import React, { ReactNode } from "react";

type Props = {
    onClick?: () => void;
    text: any;
    icon?: ReactNode;
    theme?: string;
    type: "submit" | "button" | "reset";
    isLoading?: boolean;
    disabled?: boolean;
    width?: 'full';
    height?: boolean,
    color?: boolean
};

const themes: { [key: string]: string } = {
    default: "bg-[#FD4141]",
    light: "bg-orange-400",
    red: "bg-red-500",
    green: 'bg-green-400',
    blue: 'bg-blue-400',
    gray: 'bg-gray-200',
    white: 'bg-white'
};

const Button = ({ onClick, text, icon, theme, color, type, isLoading, width, height }: Props) => {
    return (
        <button
            type={type}
            className={` ${color ? 'text-black' : 'text-white'} items-center text-center w-[180px] gap-2 cursor-pointer   ${theme ? themes[theme] : themes.default
                } rounded-[2px]   px-6 ${isLoading ? "opacity-65" : "opacity-none"}`}
            onClick={onClick && onClick}
        >
            {icon && icon}
            {isLoading ? "Loading..." : text}
        </button>
    );
};

export default Button;