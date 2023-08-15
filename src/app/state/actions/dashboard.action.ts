import { createAction, props } from "@ngrx/store";
import { MailListModel, MailInfoModel, MailReportModel } from "src/app/core/models/mail/mail.interface";


export const getMailFromRequest = createAction(
    "[Mail] Get Mail From Request",
)
export const getMailFromSucces = createAction(
    "[Mail] Get Mail From Succes",
    props<{
        mails: {
            mailsTo: MailListModel[];
            mailsFrom: MailListModel[];
        }
    }>()
)

export const getMailHamRequest = createAction(
    "[Mail] Get Mail detected ham Request",
)
export const getMailHamSuccess = createAction(
    "[Mail] Get Mail detected ham Success",
    props<{ mails: MailInfoModel[] }>()
)

export const getMailSpamRequest = createAction(
    "[Mail] Get Mail detected spam Request",
)

export const getMailSpamSuccess = createAction(
    "[Mail] Get Mail detected spam Success",
    props<{ mails: MailInfoModel[] }>()
)

export const getMailAlertRequest = createAction(
    "[Mail] Get Mail alert Request",
)
export const getMailAlertSuccess = createAction(
    "[Mail] Get Mail alert Success",
    props<{ mails: MailInfoModel[] }>()
)

export const getMailReportRequest = createAction(
    "[Mail] Get Mail report Request",
)
export const getMailReportSuccess = createAction(
    "[Mail] Get Mail report Success",
    props<{ mails: MailReportModel[] }>()
)

