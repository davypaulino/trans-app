import { GetUserInfoGateway } from "@/app/_lib/_gateways/authGateway/getUserInfoGateway";
import { logger } from "@/app/_utils/logger";
import {CompleteUserRegisterForm} from "@/app/_features/completeUserRegister/completeUserRegisterForm";
import {UserDataResponse} from "@/app/_features/completeUserRegister/completeUserRegisterResponseDto";

export const dynamic = 'force-dynamic';

export default async function Page() {
    logger.info("Rendering Server Side", { "Page": "register" })
    const userData: UserDataResponse | null = await GetUserInfoGateway()

   // userData = {nickname: "davy", id: "123", photoUrl: "/assets/img/1.png", acceptTerms: false}
    if (!userData) {
        return (
            <p>Loading...</p>
        );
    }

    return (
        <CompleteUserRegisterForm userData={userData} />
    );
}