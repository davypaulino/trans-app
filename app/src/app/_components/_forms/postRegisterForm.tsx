"use client"

import { completeRegister } from "@/app/_lib/_actions/register";
import { register } from "@/app/_lib/_actions/auth";
import { useActionState, useEffect, useState } from 'react'
import { GetUserInfo } from "@/app/_lib/_gateways/AuthRepository";

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

interface CompleteRegisterProps {
    className?: string
    userData: any
}

export const PostCompleteRegisterForm: React.FC<CompleteRegisterProps> = (props) => {
    const [state, action, pending] = useActionState(completeRegister, undefined);
    const [user, setUser] = useState(props.userData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    console.log(user)
    return (
        <form action={action} className="space-y-4 p-4">
            <input name="userId" value={user.id} readOnly />
            <div className="mb-3">
                <label htmlFor="nickname-input" className="block text-sm font-medium text-gray-700">Nickname</label>
                <input
                    name="nickname"
                    type="text"
                    id="nickname-input"
                    value={user?.nickname || ""}
                    onChange={handleChange} // ✅ Adicionado onChange
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorsDisplay errors={state?.errors?.nickname} />
            </div>

            <div className="mb-3">
                <label htmlFor="photo-input" className="block text-sm font-medium text-gray-700">Photo</label>
                <input
                    name="photoUrl"
                    type="text"
                    id="photo-input"
                    value={user?.img_url || ""}
                    onChange={handleChange} // ✅ Agora pode ser editado
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorsDisplay errors={state?.errors?.photoUrl} />
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
};


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