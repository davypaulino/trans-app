"use client"

import { register } from "@/app/_lib/_actions/auth";
import { useActionState } from 'react'

interface RegisterProps {
    className?: string
}

export const PostRegisterForm: React.FC<RegisterProps> = (props) => {
    const [state, action, pending] = useActionState(register, undefined)

    return (
        <form action={action} className='space-y-4 p-4'>
            <div className="mb-3">
                <label htmlFor="nickname-input" className="block text-sm font-medium text-gray-700">Nickname</label>
                <input
                    name="nickname"
                    type="text"
                    id="nickname-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                <ErrorsDisplay errors={state?.errors?.nickname} />
            </div>
        
            <div className="mb-3">
                <label htmlFor="user-email-input" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    name="email"
                    type="email"
                    id="user-email-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorsDisplay errors={state?.errors?.email} />
            </div>

            <div className="mb-3">
                <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    name="password"
                    type="password"
                    id="password-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorsDisplay errors={state?.errors?.password} />
            </div>

            <div className="mb-3">
                <label htmlFor="password-confirme-input" className="block text-sm font-medium text-gray-700">Confirme your Password</label>
                <input
                    name="confirmPassword"
                    type="password"
                    id="password-confirme-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorsDisplay errors={state?.errors?.confirmPassword} />
            </div>

            <div className="flex items-center">
                <input
                    name="acceptTerms"
                    type="checkbox"
                    role="switch"
                    id="accept-terms"
                    className="rounded focus:ring-blue-500 focus:border-blue-500"
                />
                <label htmlFor="accept-terms" className="ml-2 text-sm font-medium text-gray-700">
                    I agree to the <a href="/terms" className="text-blue-600 underline">Terms and Conditions</a>
                </label>
                <ErrorsDisplay errors={state?.errors?.acceptTerms} />
            </div>

            <div className="mt-4">
                <button disabled={pending} type="submit" data-bs-dismiss="modal" className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                    Register
                </button>
            </div>
        </form>
    );
}

interface ErrorsDisplayProps {
    errors?: string[] | undefined;
}

const ErrorsDisplay: React.FC<ErrorsDisplayProps> = ({errors}) => {
    return (errors && (
        <ul className="text-red-600">
            {errors.map((error) => (
                <li key={error}>- {error}</li>
            ))}
        </ul>
    ))
}