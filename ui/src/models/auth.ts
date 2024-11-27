export interface LoginInfo {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    type: string;
}


export interface MeResponse {
    user_id: number;
    role: string;
}
