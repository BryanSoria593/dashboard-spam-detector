import { createReducer, on } from "@ngrx/store";
import { MailState } from "src/app/core/models/mail/mail.state";
import { mailError, deleteMailRequest, deleteMailSucces, getMailRequest, getMailSucces, resendEmailRequest, resendEmailSucces } from "../actions/mail.action";


export const initialState: MailState = {
    loading: true,
    mails:[],
    // mails: [
    //     {
    //         _id: {
    //             $oid: '',
    //         },
    //         dateOfAnalysis: {
    //             $date: '',
    //         },
    //         from: '',
    //         to: '',
    //         user: '',
    //         ip: '',
    //         subject: '',
    //         message: '',
    //         'message-ID': '',
    //         nameAttachments: [],
    //         state: '',
    //     }
    // ],        
    error: '',
};

// Reducer de Login
export const _mailReducer = createReducer(
    initialState,
    on(getMailRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(getMailSucces, (state, { mails }) => {
        return {
            ...state,
            loading: false,
            mails: mails,
            error: '',
        }
    }),
    on(deleteMailRequest, (state, ) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(deleteMailSucces, (state, { mailUpdated }) => {
        return {
           ...state,        
        //     mails: state.mails.map(mail=> mail._id.$oid === mailUpdated._id.$oid ? mailUpdated : mail ),
        //    loading: false,
        }
    }),
    on(mailError, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error,
        }
    }),
    on(resendEmailRequest, (state, ) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(resendEmailSucces, (state, { mailUpdated }) => {
        return {
            ...state,
            mails: state.mails.map(mail=> mail._id.$oid === mailUpdated._id.$oid ? mailUpdated : mail ),
            loading: false,
            
        }
    }),
    
    

);

