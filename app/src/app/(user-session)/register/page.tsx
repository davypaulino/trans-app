import { GetUserInfoGateway } from "@/app/_lib/_gateways/authGateway/getUserInfoGateway";
import { logger } from "@/app/_utils/logger";
import {CompleteUserRegisterForm} from "@/app/_features/completeUserRegister/completeUserRegisterForm";

export const dynamic = 'force-dynamic';

export default async function Page() {
    logger.info("Rendering Server Side", { "Page": "register" })
    const userData = await GetUserInfoGateway()
    return (
        <CompleteUserRegisterForm userData={userData} />
    );
}