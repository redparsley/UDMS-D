import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser.ts";
import AuthService from "../services/AuthService.ts";
import { toast } from 'react-toastify';

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    isInitialized = false;

    constructor() {
        makeAutoObservable(this);
        this.initialize();
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

    setInitialized(bool: boolean) {
        this.isInitialized = bool;
    }

    async initialize() {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await this.checkAuth();
            }
        } finally {
            this.setInitialized(true);
        }
    }

    async login(email: string, password: string) {
        try {
            this.setLoading(true);
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.access_token);
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
            this.setLoading(true);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            toast.success('Успешный выход из системы');
        } catch (e: any) {
            toast.error('Ошибка при выходе из системы');
        } finally {
            this.setLoading(false);
        }
    }

    async checkAuth() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                this.setAuth(false);
                this.setUser({} as IUser);
                return;
            }

            const response = await AuthService.checkAuth();
            this.setAuth(true);
            this.setUser(response.data);
        } catch (e) {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        }
    }
}