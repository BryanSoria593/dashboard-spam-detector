import { createSelector } from "@ngrx/store";
import { UserState } from "src/app/core/models/user/user.state";
import { AppState } from "../app.state";


export const selectStateUser = (state: AppState) => state.auth;

export const selectUsername = createSelector(
    selectStateUser,
    (state: UserState) => state.user.data.username
)

export const selectMail = createSelector(
    selectStateUser,
    (state: UserState) => state.user.data.email
)
