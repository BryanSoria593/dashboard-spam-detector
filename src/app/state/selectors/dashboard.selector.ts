import { createSelector } from "@ngrx/store";
import { MailDashboardState, MailState } from "src/app/core/models/mail/mail.state";
import { AppState } from "../app.state";
import { MailInfoModel, MailListModel, MailReportModel } from "src/app/core/models/mail/mail.interface";
import { state } from "@angular/animations";

export const selectDashboardMail = (state: AppState) => state.dashboard;

export const selectLoading = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.loading
)

export const selectHam = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.ham
)

export const selectSpam = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.spam
)

export const selectAlertMail = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.alert
)

export const selectReportMail = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.report
)


export const selectFromMails = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.mailFrom
)

export const selectToMails = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.mailTo
)


export const selectCountHam = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.ham.length
)

export const selectCountSpam = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.spam.length
)

export const selectCountAlertMail = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.alert.length
)

export const selectCountReportMail = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => state.mails.report.length
)


// select of last 7 days
export const selectCountHamTheWeekend = createSelector(
    selectHam,
    (ham: MailInfoModel[]) => countOnlyLastWeekend(ham)
  );

export const selectCountSpamTheWeekend = createSelector(
  selectSpam,
  (spam: MailInfoModel[]) => countOnlyLastWeekend(spam)
);

export const selectCountAlertTheWeekend = createSelector(
  selectAlertMail,
  (alert: MailInfoModel[]) => countOnlyLastWeekend(alert)
);

export const selectCountReportTheWeekend = createSelector(
    selectReportMail,
    (report: MailReportModel[]) => countReportOnlyLastWeekend(report)
)
// Select ham, spam today
export const selectHamToday = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => filterOnlyToday(state.mails.ham)
)


export const selectSpamToday = createSelector(
    selectDashboardMail,
    (state: MailDashboardState) => filterOnlyToday(state.mails.spam)

)

// select of today

export const selectCountHamToday = createSelector(
    selectHam,
    (ham: MailInfoModel[]) => countOnlyToday(ham)
  );

export const selectCountSpamToday = createSelector(
    selectSpam,
    (spam: MailInfoModel[]) => countOnlyToday(spam)
);

export const selectCountAlertToday = createSelector(
    selectAlertMail,
    (alert: MailInfoModel[]) => countOnlyToday(alert)
);

export const selectCountReportToday = createSelector(
    selectReportMail,
    (report: MailReportModel[]) => countReportOnlyToday(report)
);


function countOnlyLastWeekend(array: MailInfoModel[]) {
    
    const today = new Date();
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);
      
    const mailsLastWeek = array.filter((mail) => {
      const mailDate = new Date(mail.dateOfAnalysis.$date); 
      return mailDate >= lastWeekStart && mailDate <= today;
    });
  
    // Contar los correos de la última semana
    return mailsLastWeek.length;
}

function countReportOnlyLastWeekend(array: MailReportModel[]) {
    const today = new Date();
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);

    const reportLastWeek = array.filter((mail) => {
        if (!mail.dateOfReport || !mail.dateOfReport['$date']) {
            return false; // Si dateOfReport no está definido o su valor es null, no lo contamos
        }
        const mailDate = new Date(mail.dateOfReport['$date']).getTime();
        return mailDate >= lastWeekStart.getTime() && mailDate <= today.getTime();
    });

    return reportLastWeek.length;
}

function countOnlyToday(array: MailInfoModel[]) {
    
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  
    
    const mailsToday = array.filter((mail) => {
      const mailDate = new Date(mail.dateOfAnalysis.$date); 
      return mailDate >= startOfDay && mailDate <= endOfDay;
    });
  
   
    return mailsToday.length;
}
function countReportOnlyToday(report: MailReportModel[]) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);


    const reportToday = report.filter((mail) => {
        if (!mail.dateOfReport || !mail.dateOfReport['$date']) {
            return false; // Si dateOfReport no está definido o su valor es null, no lo contamos
        }
        const mailDate = new Date(mail.dateOfReport['$date']).getTime();
        return mailDate >= startOfDay.getTime() && mailDate <= endOfDay.getTime();
    });

    return reportToday.length;
}

function filterOnlyToday(array: MailInfoModel[]) {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
  
    // Filtrar los correos que estén en el rango de hoy
    const filteredArray = array.filter((mail) => {
      const mailDate = new Date(mail.dateOfAnalysis.$date);
      return mailDate >= startOfDay && mailDate <= endOfDay;
    });
  
    // Ordenar los correos filtrados por la propiedad dateOfAnalysis en orden descendente
    filteredArray.sort((a, b) => {
      const dateA = new Date(a.dateOfAnalysis.$date);
      const dateB = new Date(b.dateOfAnalysis.$date);
      return dateB.getTime() - dateA.getTime();
    });
  
    return filteredArray;
  }
  