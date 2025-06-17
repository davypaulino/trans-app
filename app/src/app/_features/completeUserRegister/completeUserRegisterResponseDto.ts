export default interface CompleteUserRegisterResponseDto {
    access_token: string;
    refresh_token: string;
}

export interface UserDataResponse {
    nickname: string;
    id: string;
    photoUrl: string;
    acceptTerms: boolean
}