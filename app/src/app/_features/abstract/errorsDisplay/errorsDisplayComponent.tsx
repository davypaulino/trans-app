import ErrorsDisplayProps from "@/app/_features/abstract/errorsDisplay/errorsDisplayProps";
import React from "react";

export const ErrorsDisplayComponent: React.FC<ErrorsDisplayProps> = ({ errors}: ErrorsDisplayProps) => {
    return (errors && (
        <ul className="text-red-600">
            {errors.map((error) => (
                <li key={error}>- {error}</li>
            ))}
        </ul>
    ))
}