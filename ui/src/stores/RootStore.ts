import {makeAutoObservable} from "mobx";
import authApiService from "@/api/AuthApiService.ts";
import {LoginInfo, LoginResponse} from "@/api/models/auth.ts";


export class RootStore {

    token: LoginResponse | null = null;


    constructor() {
        makeAutoObservable(this);
    }

    async login(loginInfo: LoginInfo) {
        this.token = await authApiService.login(loginInfo)
        console.log(this.token)

    }

    async logout() {
        this.token = null
    }
}

export const rootStore = new RootStore();
