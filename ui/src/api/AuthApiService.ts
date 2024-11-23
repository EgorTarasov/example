import {LoginInfo, LoginResponse} from "@/models/auth.ts";
import axios from "axios";

class AuthApiService {
    public async login(body: LoginInfo){
        const response = await axios.post<LoginResponse>('https://tula.larek.tech/api/auth/login', body);

        return response.data;
    }
}

export default new AuthApiService();