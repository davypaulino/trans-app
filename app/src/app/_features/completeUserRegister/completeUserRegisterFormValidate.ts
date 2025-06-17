"use server"

import {
    CompleteUserRegisterFormSchema,
    CompleteUserRegisterFormState
} from "@/app/_features/completeUserRegister/completeUserRegisterFormSchema";
import {createSession} from "@/app/_lib/session";
import {redirect} from "next/navigation";
import {PutCompleUserRegister} from "@/app/_lib/_gateways/authGateway/completeUserRegisterGateway";
import {isErrorResponse} from "@/app/_utils/ErrorResponse";
import CompleteUserRegisterResponseDto from "@/app/_features/completeUserRegister/completeUserRegisterResponseDto";

export async function CompleteUserRegisterFormValidate(state: CompleteUserRegisterFormState, formData: FormData) : Promise<CompleteUserRegisterFormState>
{
    const validatedFields = CompleteUserRegisterFormSchema.safeParse({
        userId: formData.get('userId'),
        nickname: formData.get('nickname'),
        photoUrl: formData.get('photoUrl'),
        acceptTerms: formData.get('acceptTerms') === "on",
    })

    if (!validatedFields.success) {
        console.error(validatedFields.error)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: undefined,
        }
    }

    const {userId,  nickname, photoUrl, acceptTerms } = validatedFields.data;
    const response = await PutCompleUserRegister({userId, nickname, avatar_url: photoUrl, terms_accepted: acceptTerms})
    if (isErrorResponse(response)) {
        const mess: string = response.status === 400 ? "Error on inputs." : "Internal Server Error";
        return {
            errors: {
                general: [mess]
            },
            message: undefined,
        }
    }
    const res = response as CompleteUserRegisterResponseDto;
    await createSession(res.access_token, res.refresh_token)
    redirect('/home')
    return { message: "Registration successful!", errors: undefined };
}