import {  UserModel } from "./user.interface";

export interface UserState{
    loading: boolean,
    user: UserModel,    
    error?: string,
}



