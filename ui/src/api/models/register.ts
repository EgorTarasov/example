export interface RegisterInfo {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    access_token: string;
    type: string;
}