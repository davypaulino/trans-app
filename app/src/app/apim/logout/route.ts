"use server"

import {NextRequest, NextResponse} from 'next/server';
import { logger } from '@/app/_utils/logger'
import {cookies} from "next/headers";

export async function GET(request: NextRequest) {
    const correlation_id = crypto.randomUUID();
    logger.info("Recebendo requisição de logout no servidor.", { correlation_id });

    try {
        (await cookies()).delete("session");
        const redirectUrl = new URL('/', request.url);

        logger.info("Usuário deslogado com sucesso e cookies limpos. Redirecionando...", { correlation_id, redirectUrl: redirectUrl.toString() });
        return NextResponse.redirect(redirectUrl);
    } catch (error: any) {
        logger.error("Erro durante o processo de logout no servidor:", {
            correlation_id,
            error_message: error.message,
            error_stack: error.stack,
            full_error_object: JSON.stringify(error, Object.getOwnPropertyNames(error)) // Para debug mais completo
        });

        return NextResponse.json(
            { message: 'Falha interna do servidor ao realizar logout. Tente novamente.', error: error.message },
            { status: 500 }
        );
    }
}