'use client'

import React, { useState, useEffect } from 'react'

interface LoginProps {
    className?: string
}

export const PostRegisterForm: React.FC<LoginProps> = (props) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
    };

    return (
        <form onSubmit={onSubmit} className='space-y-4 p-4'>
            {/* Nickname Input */}
            <div className="mb-3">
                <label htmlFor="nickname-input" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    name="user-email"
                    type="text"
                    id="user-email-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
            </div>

            {/* Password Input */}
            <div className="mb-3">
                <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    name="user-password"
                    type="password"
                    id="password-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Confirme Password Input */}
            <div className="mb-3">
                <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">Confirme your Password</label>
                <input
                    name="user-password-confirme"
                    type="password"
                    id="password-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Accept Terms */}
            <div className="flex items-center">
                <input
                    name="AcceptTerms"
                    type="checkbox"
                    role="switch"
                    id="accept-terms"
                    className="rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                <label htmlFor="accept-terms" className="ml-2 text-sm font-medium text-gray-700">
                    I agree to the <a href="/terms" className="text-blue-600 underline">Terms and Conditions</a>
                </label>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <button type="submit" data-bs-dismiss="modal" className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                    Login
                </button>
            </div>
        </form>
    );
}