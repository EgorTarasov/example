import { makeAutoObservable } from "mobx";
import authApiService from "@/api/AuthApiService.ts";
import { LoginInfo, LoginResponse } from "@/api/models/auth.ts";
import { RegisterInfo } from "@/api/models/register.ts";


export class RootStore {

    token: LoginResponse | null = null;


    constructor() {
        makeAutoObservable(this);
    }
    saveToken() {
        if (this.token) {
            localStorage.setItem('token', JSON.stringify(this.token));
        }
    }

    loadToken() {
        const token = localStorage.getItem('token');
        if (token) {
            this.token = JSON.parse(token);
        }
    }

    async login(loginInfo: LoginInfo) {
        this.token = await authApiService.login(loginInfo);
        this.saveToken();
        console.log(this.token);
    }

    async singup(registerInfo: RegisterInfo) {
        this.token = await authApiService.register(registerInfo);
        console.log('Registered, token:' + this.token);
        this.saveToken();
    }

    async logout() {
        this.token = null
    }
}

export const rootStore = new RootStore();
