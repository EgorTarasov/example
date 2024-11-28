export interface LoginInfo {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    type: string;
}


export interface MeResponse {
    user_id: number;
    role: string;
}
