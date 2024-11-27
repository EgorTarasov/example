import { makeAutoObservable } from "mobx";
import apiService from "@/api/ApiService.ts";
import { LoginInfo, LoginResponse } from "@/api/models/auth.ts";
import { RegisterInfo } from "@/api/models/register.ts";




export class RootStore {

    token: LoginResponse | null = null;
    currentPipelineId: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    saveToken(token: string) {
        localStorage.setItem('token', token);
        apiService.setAuthToken(token);
    }

    loadToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.token = {
                access_token: token,
                type: 'Bearer',
            };
            apiService.setAuthToken(token);
        }

    }

    async login(loginInfo: LoginInfo) {
        const token = await apiService.login(loginInfo);
        this.token = token;
        this.saveToken(token.access_token);
    }

    async singup(registerInfo: RegisterInfo) {
        const token = await apiService.register(registerInfo);
        this.token = token;
        this.saveToken(token.access_token);
    }

    async logout() {
        this.token = null
    }

    async createPipeline() {
        if (this.token) {
            console.log('Creating pipeline');
            const response = await apiService.createPipeLine({
                name: 'New pipeline',
                description: 'New pipeline description'
            });
            this.currentPipelineId = response.id;
            console.log('Created pipeline with id ' + response.id);
        }
    }
}

export const rootStore = new RootStore();
