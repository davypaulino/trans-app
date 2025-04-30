"use client";

import toast, { Toaster } from 'react-hot-toast';

export const ToastComponent = () => {
    return (
        <Toaster
            position="top-center"
            containerClassName="text-sm md:text-base"
        />
    );
};

export const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    const config = {
        className: "bg-gray-800 text-white p-3 rounded-md shadow-lg",
    };

    switch (type) {
        case "success":
            toast.success(message, { ...config });
            break;
        case "error":
            toast.error(message, { ...config });
            break;
        default:
            toast.loading(message, { ...config });
            break;
    }
};