import { AuthResponse } from "../models/responce/AuthResponse";
import { AxiosResponse } from "axios";
import $api from "../http/index.ts";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password });
    }

     static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}
