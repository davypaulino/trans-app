import { z } from 'zod'

export type CompleteUserRegisterFormState =
    | {
    errors?: {
        userId?: string[]
        nickname?: string[]
        photoUrl?: string[]
        acceptTerms?: string[]
        general?: string[]
    }
    message?: string
}
    | undefined

export const CompleteUserRegisterFormSchema = z.object({
    userId: z.string().trim(),
    nickname: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long.' })
        .trim(),
    photoUrl: z
        .string()
        .trim(),
    acceptTerms: z
        .boolean()
        .refine(val => val, {
            message: "You must accept the terms and conditions.",
        }),
})