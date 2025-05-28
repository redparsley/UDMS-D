import { IUser } from "../IUser";

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user?: IUser;
}