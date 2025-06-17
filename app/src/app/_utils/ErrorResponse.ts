export interface ErrorResponse {
    status: number;
    message: string;
}

/**
 * Type guard to check if a given response object conforms to the ErrorResponse interface.
 * This checks for properties like 'status' (as a number) and 'message' (as a string).
 * @param response The object to check.
 * @returns True if the object matches ErrorResponse, false otherwise.
 */
export function isErrorResponse(response: any): response is ErrorResponse {
    // Basic checks: ensure it's an object, not null, and has the expected properties with correct types.
    return (
        typeof response === 'object' &&
        response !== null &&
        'status' in response &&             // Check if 'status' property exists
        typeof response.status === 'number' && // Check if 'status' is a number
        'message' in response &&            // Check if 'message' property exists
        typeof response.message === 'string' // Check if 'message' is a string
    );
}