import { z } from 'zod'

export const RegisterFormSchema = z.object({
    nickname: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long.' })
        .trim(),
    email: z
        .string()
        .email({ message: 'Please enter a valid email.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
        })
        .trim(),
    confirmPassword: z
        .string()
        .trim()
        .min(8, { message: "Password confirmation must be at least 8 characters." }),
    acceptTerms: z
        .boolean()
        .refine(val => val === true, {
            message: "You must accept the terms and conditions.",
        }),
}).superRefine(({password, confirmPassword}, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ['confirmPassword']
        });
    }
})

export type FormState =
  | {
      errors?: {
        nickname?: string[]
        email?: string[]
        password?: string[]
        confirmPassword?: string[]
        acceptTerms?: string[]
      }
      message?: string
    }
  | undefined


  export const CompleteRegisterFormSchema = z.object({
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
        .refine(val => val === true, {
            message: "You must accept the terms and conditions.",
        }),
})

export type CompleteRegisterFormState =
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