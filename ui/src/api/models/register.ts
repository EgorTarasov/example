export interface RegisterInfo {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    accessToken: string;
    type: string;
}