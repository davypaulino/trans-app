"use client"

import {ErrorsDisplayComponent} from "@/app/_features/abstract/errorsDisplay/errorsDisplayComponent";
import React, {useActionState, useState} from "react";
import CompleteUserRegisterProps from "@/app/_features/completeUserRegister/completeUserRegisterProps";
import {CompleteUserRegisterFormValidate} from "@/app/_features/completeUserRegister/completeUserRegisterFormValidate";
import Image from "next/image";
import Link from "next/link";

export const CompleteUserRegisterForm: React.FC<CompleteUserRegisterProps> = (props) => {
    const [state, action, pending] = useActionState(CompleteUserRegisterFormValidate, undefined);
    const [user, setUser] = useState(props.userData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    console.log(user)
    return (
        <div className="flex justify-center items-center w-full h-100 ">
            <form action={action} className="bg-slate-200 space-y-4 p-4 mx-auto w-1/3 rounded-md">
                <input className={`hidden`} name="userId" value={user.id} readOnly />
                <div className={`flex justify-center items-center w-full`}>
                    <img className="rounded-full object-fit" width={70} height={70} src={user.photoUrl} alt={user.nickname}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="nickname-input" className="block text-sm font-medium text-gray-700">Nickname</label>
                    <input
                        name="nickname"
                        type="text"
                        id="nickname-input"
                        value={user?.nickname || ""}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorsDisplayComponent errors={state?.errors?.nickname} />
                </div>

                <div className="mb-3">
                    <label htmlFor="photo-input" className="block text-sm font-medium text-gray-700">Photo</label>
                    <input
                        name="photoUrl"
                        type="text"
                        id="photo-input"
                        value={user?.photoUrl || ""}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorsDisplayComponent errors={state?.errors?.photoUrl} />
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
                        I agree to the <Link href="/policies/terms" className="text-blue-600 underline">Terms and Conditions</Link> <br/>
                        and <Link href="/policies/privacy" className="text-blue-600 underline">Privacy Policies</Link>.
                    </label>
                    <ErrorsDisplayComponent errors={state?.errors?.acceptTerms} />
                </div>

                <div className="mt-4">
                    <button disabled={pending} type="submit" data-bs-dismiss="modal" className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                        Register
                    </button>
                </div>
                <ErrorsDisplayComponent errors={state?.errors?.general} />
            </form>
        </div>
    );
};