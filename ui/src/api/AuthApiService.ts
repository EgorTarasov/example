import {LoginInfo, LoginResponse} from "@/models/auth.ts";
import axios from "axios";
import {RegisterInfo, RegisterResponce} from "@/api/models/register.ts";

class AuthApiService {
    public async login(body: LoginInfo){
        const response = await axios.post<LoginResponse>('/api/auth/login', body);
        console.log(response.data);
        return response.data;
    }

    public async register(body: RegisterInfo){
        console.log(body);
        const response = await axios.post<RegisterResponce>('/api/auth/signup', body);

        return response.data;
    }
}

export default new AuthApiService();