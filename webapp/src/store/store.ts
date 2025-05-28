import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser.ts";
import AuthService from "../services/AuthService.ts";
import { toast } from 'react-toastify';

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            this.setLoading(true);
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.access_token);
            this.setAuth(true);
            await this.checkAuth();
            toast.success('Успешная авторизация');
        } catch (e: any) {
            toast.error(e.response?.data?.detail || 'Ошибка авторизации');
            throw e;
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            toast.success('Успешный выход из системы');
        } catch (e: any) {
            toast.error(e.response?.data?.detail || 'Ошибка при выходе из системы');
        }
    }

    async checkAuth() {
        try {
            const response = await AuthService.checkAuth();
            this.setAuth(true);
            this.setUser(response.data);
        } catch (e) {
            this.setAuth(false);
            this.setUser({} as IUser);
        }
    }
}