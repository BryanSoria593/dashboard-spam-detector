import { createReducer, on } from "@ngrx/store";
import { UserState } from "src/app/core/models/user/user.state";
import { loginSuccess } from "../actions/auth.actions";
import { UserModel } from "src/app/core/models/user/user.interface";

export const initialState: UserState = {
    loading: true,
    user: {
        data:{
            token: '',
            username: '',
            email: '',
        },
        message: '',
        ok: false,
    },
    error: '',  
}


export const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { user }) => {
        return {
            ...state,
            loading: false,
            user: user,
            error: '',
        }
    }),

    
    

)

