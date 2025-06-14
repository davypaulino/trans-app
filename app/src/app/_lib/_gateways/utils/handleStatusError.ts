import {logger} from "@/app/_utils/logger";

export function handleStatusError(message: string, response: Response, records: Record<string, unknown>) {
    if (response.status >= 400 && response.status <= 499) {
        logger.warn(message, )
    } else if (response.status >= 500 && response.status <= 599) {
        logger.error(message, records)
    }
    return null;
}