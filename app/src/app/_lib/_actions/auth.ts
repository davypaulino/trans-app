"use server"
import bcrypt from "bcrypt"
//import db from '../db';
import { randomUUID } from 'crypto';
import { createSession } from '../session';
import { redirect } from 'next/navigation';
import { FormState, RegisterFormSchema } from '../definitions';

// const insertUser = async (userId: string, nickname: string, email: string, password: string, acceptTerms: boolean) => {
//     return new Promise((resolve, reject) => {
//         db.run(
//             "INSERT INTO users (id, nickname, email, password, acceptTerms) VALUES (?, ?, ?, ?, ?)",
//             [userId, nickname, email, password, acceptTerms],
//             function (err) {
//                 if (err) {
//                     reject({ message: "An error occurred while creating your account." });
//                 } else {
//                     resolve({ id: this.lastID });
//                 }
//             }
//         );
//     });
// };

export async function register(state: FormState, formData: FormData)
{
    const validatedFields = RegisterFormSchema.safeParse({
        nickname: formData.get('nickname'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        acceptTerms: formData.get('acceptTerms') === "on",
    })

    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { nickname, email, password, acceptTerms } = validatedFields.data;
    const userId = randomUUID()
    const hashedPassword = await bcrypt.hash(password, 10)

    // //const data: { id: string } = await insertUser(userId, nickname, email, hashedPassword, acceptTerms) as { id: string }

    const user = "c729b8b9-72f4-4b38-ac3d-714a5d9bf4a6"

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

    await createSession(user)
    redirect('/home')

    //await redisClient.set(`auth:${sessionPayload.userId}`, token, { EX: 604800 });

    // return new NextResponse(JSON.stringify({ success: true }), {
    //     status: 200,
    //     headers: {
    //       "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict;`,
    //       "Content-Type": "application/json"
    //     },
    // });
}