import { makeAutoObservable } from "mobx";
import apiService from "@/api/ApiService.ts";
import { LoginInfo, LoginResponse } from "@/api/models/auth.ts";
import { RegisterInfo } from "@/api/models/register.ts";
import { CreatePipeLine } from "@/api/models/models";




export class RootStore {

    token: LoginResponse | null = null;
    currentPipelineId: number | null = null;
    isLoading: boolean = true;
    isFetched: boolean = false;
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

    changeLoading( isLoading: boolean ){
        this.isLoading = isLoading;
    }

    changeFetched( isFetched: boolean ){
        this.isFetched = isFetched;
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

    async createPipeline(pipelineInfo: CreatePipeLine) {

        console.log('Creating pipeline');
        const response = await apiService.createPipeLine({
            title: pipelineInfo.title,
            description: pipelineInfo.description,
        });
        this.currentPipelineId = response.id;
        console.log('Created pipeline with id ' + response.id);

    }
}

export const rootStore = new RootStore();
