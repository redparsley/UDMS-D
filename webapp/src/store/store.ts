import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser.ts";
import AuthService from "../services/AuthService.ts";

export default class Store {
    user = { } as IUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(email: string, password: string) {
        try {
            const responce = await AuthService.login(email, password);
            localStorage.setItem('token', responce.data.accessToken);
            this.setAuth(true);
            this.setUser(responce.data.user)
        } catch (e) {
            console.log(e.responce?.data?.message)
        }
    } 

    async logout() {
        try {
            const responce = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser)
        } catch (e) {
            console.log(e.responce?.data?.message)
        }
    } 
}