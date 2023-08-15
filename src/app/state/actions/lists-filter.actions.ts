import { createAction, props } from "@ngrx/store";
import { FilterUserModel, NewUserModel } from "src/app/core/models/list-filter/list-filter.interface";



export const getUsersWhiteListRequest = createAction(
    "[Whitelist] Get Users White List",
    props<{ typeUser: string }>()
)

export const getUsersWhiteListSuccess = createAction(
    "[Whitelist] Get Users White List Success",
    props<{ users: FilterUserModel[] }>()
)


export const postUserWhiteListRequest = createAction(
    "[Whitelist] Post User White List",
    props<{ user: NewUserModel, typeUser:string }>()
)

export const postUserWhiteListSuccess = createAction(
    "[Whitelist] Post User White List Success",
    props<{ user: FilterUserModel }>()
)


export const postUserBlackListRequest = createAction(
    "[Blacklist] Post User White List",
    props<{ user: NewUserModel, typeUser:string }>()
)

export const postUserBlackListSuccess = createAction(
    "[Blacklist] Post User White List Success",
    props<{ user: FilterUserModel }>()
)


export const updateUserWhiteListRequest = createAction(
    "[Whitelist] Update User White List",
    props<{
        email: string,
        newEmail: string,
        newUsername: string
    }>()
)
export const updateUserWhiteListSuccess = createAction(
    "[Whitelist] Update User White List Success",
    props<{ userUpdate: FilterUserModel }>()
)

export const updateUserBlackListRequest = createAction(
    "[Whitelist] Update User White List",
    props<{
        email: string,
        newEmail: string,
        newUsername: string
    }>()
)
export const updateUserBlackListSuccess = createAction(
    "[Whitelist] Update User White List Success",
    props<{ userUpdate: FilterUserModel }>()
)

export const deleteUserListRequest = createAction(
    "[Whitelist] Delete User White List",
    props<{ userDelete:FilterUserModel, typeUser: string }>()
)

export const deleteUserWhiteListSuccess = createAction(
    "[Whitelist] Delete User White List Success",
    props<{ _id:string }>()
)

export const deleteUserBlackListSuccess = createAction(
    "[Whitelist] Delete User White List Success",
    props<{ _id:string }>()
)



// // ***********************
export const getUsersBlackListRequest = createAction(
    "[Blacklist] Get Users black List",
    props<{ typeUser: string }>()
)

export const getUsersBlackListSuccess = createAction(
    "[Blacklist] Get Users black List Success",
    props<{ users: FilterUserModel[] }>()
)

export const errorListFilter = createAction(
    "[List Filter] Error",
    props<{ error: any }>()
)