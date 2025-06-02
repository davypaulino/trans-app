"use server"

import { PostCompleteRegisterForm } from "@/app/_components/_forms/postRegisterForm";
import { GetUserInfo } from "@/app/_lib/_gateways/AuthRepository";
import { logger } from "@/app/_utils/logger";

export default async function Page() {
    logger.info("Rendering Server Side", { "Page": "register" })
    const userData = await GetUserInfo()
    return (
        <PostCompleteRegisterForm userData={userData} />
    );
}