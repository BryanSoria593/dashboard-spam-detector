// export interface MailModel {
//     _id: {
//         $oid: string;
//     };
//     dateOfAnalysis: {
//         $date: string;
//     };
//     from: string;
//     to: string;
//     ip: string;
//     subject: string;
//     message: string;
//     'message-ID': string;
//     nameAttachments: string[];
//     prediction: string;
//     state: string;
//     originalPath: string;
//     pathQuarantine: string;
//     quarantine: string;
// }
export interface MailListModel {
    counts: number;
    user: string;
    cargo: string;
    detection: string;
}

export interface DeleteModel {
    idDocument: string;
    idMail: string;
    mailOfUser: string;
    originalPath: string;
    length?: number;
    count?: number;
}

export interface MailInfoModel {
    _id: {
        $oid: string;
    };
    dateOfAnalysis: {
        $date: string;
    };
    prediction: string;

}


export interface MailReportModel {
    _id: {
        $oid: string;
    };
    uuid: string;
    dateOfReport: {
        $date: string;
    };
    from: string;
    to: string;
    subject: string;
    message: string;
    nameAttachments: string[];
    prediction: string;
    originalPath: string;
    id_mail: string;
    file_name: string;      
}