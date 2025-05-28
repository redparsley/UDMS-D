import { AuthResponse } from "../models/responce/AuthResponse";
import { AxiosResponse } from "axios";
import $api from "../http/index.ts";
import { IUser } from "../models/IUser";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        return $api.post<AuthResponse>('/auth/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout');
    }

    static async checkAuth(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/users/me');
    }
}
