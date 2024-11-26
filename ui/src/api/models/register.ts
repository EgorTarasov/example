export interface RegisterInfo {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponce{
    accessToken: string;
    type: string;
}