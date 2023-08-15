import { createAction, props } from "@ngrx/store";
import { MailReportModel, DeleteModel } from "src/app/core/models/mail/mail.interface";


export const getMailRequest = createAction(
    "[Mail] Get Mail Request",
)
export const getMailSucces = createAction(
    "[Mail] Get Mail Succes",
    props<{ mails: MailReportModel[] }>()
)

export const deleteMailRequest = createAction(
    "[Mail] Delete Mail Request",
    props<DeleteModel>()
    // props<{ idDocument: string, idMail: string, mailOfUser: string, originalPath: string, length: number, count: number }>()
)
export const deleteMailSucces = createAction(
    "[Mail] Delete Mail Succes",
    props<{ mailUpdated: MailReportModel }>()
)

export const resendEmailRequest = createAction(
    "[Mail] Resent Email Request",
    props<{ idDocument: string, idMail: string, pathQuarantine: string }>()
)

export const resendEmailSucces = createAction(
    "[Mail] Resent Email Succes",
    props<{ mailUpdated: MailReportModel }>()
)

export const mailError = createAction(
    "[Mail] Delete Mail Error",
    props<{ error: string }>()
)










