import { createSelector } from "@ngrx/store";
import { MailState } from "src/app/core/models/mail/mail.state";
import { AppState } from "../app.state";



export const selectStateMail = (state: AppState) => state.mail;

export const selectLoading = createSelector(
    selectStateMail,
    (state: MailState) => state.loading
)

export const selectMails = createSelector(
    selectStateMail,
    (state: MailState) => state.mails    
)
