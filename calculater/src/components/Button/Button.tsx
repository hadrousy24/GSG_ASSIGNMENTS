import React from "react";

interface ButtonProps {
    label: string;
    onClick: (label: string) => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button onClick={() => onClick(label)} className="button">
            {label}
        </button>
    );
};

export default Button;