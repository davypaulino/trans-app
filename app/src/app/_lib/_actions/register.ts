"use server"

import { redirect } from 'next/navigation';
import { CompleteRegisterFormSchema, FormState } from '../definitions';
import { cookies } from 'next/headers';
import { createSession, decrypt } from '../session';

interface RegisterResponse {
    access_token: string;
    refresh_token: string;
}

export async function completeRegister(state: FormState, formData: FormData)
{
    const validatedFields = CompleteRegisterFormSchema.safeParse({
        userId: formData.get('userId'),
        nickname: formData.get('nickname'),
        photoUrl: formData.get('photoUrl'),
        acceptTerms: formData.get('acceptTerms') === "on",
    })

    if (!validatedFields.success) {
        console.error(validatedFields.error)
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const {userId,  nickname, photoUrl, acceptTerms } = validatedFields.data;
    const res = await putUserRegister({userId, nickname, avatar_url: photoUrl, terms_accepted: acceptTerms})
    if (!res) {
        return {
            errors: {
                general: ["Failed to register user. Please try again later."]
            }
        }
    }
    
    await createSession(res.access_token)
    redirect('/home')
}

interface RegisterData {
    userId: string
    nickname: string;
    avatar_url: string;
    terms_accepted: boolean;
}

async function putUserRegister(data: RegisterData): Promise<RegisterResponse | null> {
    try {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        //const jwtSessionToken = session ? decodeJwt<JwtSessionPayload>(session?.token) : null
        
        const response = await fetch("http://localhost:3001/register", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${session?.token}`,
                "Content-Type": "application/json",
                "X-Correlation-Id": crypto.randomUUID()
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error("Error on finalize user register")
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        return null;
    }
}
