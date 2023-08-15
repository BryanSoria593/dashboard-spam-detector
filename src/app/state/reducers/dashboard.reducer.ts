import { createReducer, on } from "@ngrx/store";
import { MailDashboardState } from "src/app/core/models/mail/mail.state";



import { mailError, deleteMailRequest, deleteMailSucces, getMailRequest, getMailSucces, resendEmailRequest, resendEmailSucces } from "../actions/mail.action";
import {
    getMailHamRequest, getMailHamSuccess, getMailSpamRequest, getMailSpamSuccess,
    getMailAlertRequest, getMailAlertSuccess, getMailReportRequest, getMailReportSuccess, getMailFromRequest, getMailFromSucces
} from "../actions/dashboard.action";


export const initialState: MailDashboardState = {
    loading: true,
    mails: {
        ham: [],
        spam: [],
        alert: [],
        report: [],
        mailFrom: [],
        mailTo: [],
    },
    error: '',
};

// Reducer de Login
export const _dashboardReducer = createReducer(
    initialState,
    on(getMailHamRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(getMailHamSuccess, (state, { mails }) => {
        return {
            ...state,
            loading: false,
            mails: {
                ...state.mails,
                ham: mails,
            },
            error: '',
        }
    }),
    on(getMailSpamRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(getMailSpamSuccess, (state, { mails }) => {
        return {
            ...state,
            loading: false,
            mails: {
                ...state.mails,
                spam: mails,
            },
            error: '',
        }
    }),
    on(getMailAlertRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(getMailAlertSuccess, (state, { mails }) => {
        return {
            ...state,
            loading: false,
            mails: {
                ...state.mails,
                alert: mails,
            },
            error: '',
        }
    }),
    on(getMailReportRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(getMailReportSuccess, (state, { mails }) => {
        return {
            ...state,
            loading: false,
            mails: {
                ...state.mails,
                report: mails,
            },
            error: '',
        }
    }),


    on(getMailFromRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(getMailFromSucces, (state, { mails }) => {
        return {
            ...state,
            loading: false,
            mails: {
                ...state.mails,
                mailFrom: mails.mailsFrom,
                mailTo: mails.mailsTo,
            },
            error: '',
        }
    }),
    // on(getMailFromSucces, (state, { mails }) => {
    //     return {
    //         ...state,
    //         loading: false,
    //         mails: mails,
    //         error: '',
    //     }
    // }),
);

