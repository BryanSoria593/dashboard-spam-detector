import {  MailListModel,MailInfoModel, MailReportModel } from "./mail.interface";


// export interface MailState {
//     loading: boolean;
//     mails: MailModel[];
//     error?: string;
// }
export interface MailDashboardState {
    loading: boolean;
    mails: {
        ham: MailInfoModel[];
        spam: MailInfoModel[];
        alert: MailInfoModel[];
        report: MailReportModel[];
        mailFrom: MailListModel[];
        mailTo: MailListModel[];
    };
    error?: string;
    
}
export interface MailState {
    loading: boolean;
    mails: MailReportModel[];
    error?: string;
}
