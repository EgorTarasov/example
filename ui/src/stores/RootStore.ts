import {makeAutoObservable} from "mobx";
import authApiService from "@/api/AuthApiService.ts";
import {LoginInfo, LoginResponse} from "@/api/models/auth.ts";
import {RegisterInfo} from "@/api/models/register.ts";


export class RootStore {

    token: LoginResponse | null = null;


    constructor() {
        makeAutoObservable(this);
    }

    async login(loginInfo: LoginInfo) {
        this.token = await authApiService.login(loginInfo);
        console.log(this.token);

    }

    async singup(registerInfo: RegisterInfo){
        this.token = await authApiService.register(registerInfo);
        console.log('Registered, token:' + this.token);
    }

    async logout() {
        this.token = null
    }
}

export const rootStore = new RootStore();
