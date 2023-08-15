import { createAction, props } from "@ngrx/store";
import { LoginModel, UserModel, RegisterModel } from "src/app/core/models/user/user.interface";
import {  UpdateProfileModel, updatePasswordModel } from "src/app/core/models/user/user.interface";


export const loginRequest = createAction(
    "[Auth] Login Request",
    props<{ credentials: LoginModel }>()
)

export const loginSuccess = createAction(
    "[Auth] Login Success",
    props<{ user: UserModel }>()
)

export const registerRequest = createAction(
    "[Auth] Register Request",
    props<{ credentials: RegisterModel }>()
)

export const registerSuccess = createAction(
    "[Auth] Register Success",
)

export const persistUser = createAction(
    "[Auth] Persist User",
    props<{ user: UserModel }>()
)
export const loginError = createAction(
    "[Auth] Login Error",
    props<{ error: string }>()
)


export const updateProfileRequest = createAction(
    "[Auth] Update Profile Request",
    props<{ credentials: UpdateProfileModel }>()
)

export const updatePasswordRequest = createAction(
    "[Auth] Update Password Request",
    props<{ credentials: updatePasswordModel }>()
)
export const updatePasswordSuccess = createAction(
    "[Auth] Update Password Success"
)







