import { AuthResponse } from "../models/responce/AuthResponse";
import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../models/IUser";

export default class AuthService {
    static fetchUser():Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}
