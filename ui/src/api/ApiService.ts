import { LoginInfo, LoginResponse, MeResponse } from "@/models/auth.ts";
import axios from "axios";
import { RegisterInfo, RegisterResponse } from "@/api/models/register.ts";
import { CreatePipeLine, CreatePipeLineResponse } from "./models/models";

class ApiService {
    setAuthToken(token: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    public async login(body: LoginInfo) {
        const response = await axios.post<LoginResponse>('/api/auth/login', body);

        return response.data;
    }


    public async register(body: RegisterInfo) {
        console.log(body);
        const response = await axios.post<RegisterResponse>('/api/auth/signup', body);

        return response.data;
    }

    public async me() {
        const response = await axios.get<MeResponse>('/api/auth/me', {

        });

        return response.data
    }

    public async createPipeLine(body: CreatePipeLine) {
        const response = await axios.post<CreatePipeLineResponse>('/api/dashboard/pipeline', body, {
        });

        return response.data
    }
}

export default new ApiService();