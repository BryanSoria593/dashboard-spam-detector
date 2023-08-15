import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardService } from 'src/app/modules/dashboard/services/dashboard.service';



import { GeneralService } from 'src/app/modules/services/general.service';
import * as dashboardActions from 'src/app/state/actions/dashboard.action';


@Injectable()
export class DashboardEffects {
    loadMailsFrom$ = createEffect(() => this.actions$.pipe(
        ofType(dashboardActions.getMailFromRequest),
        switchMap(() =>
            this.dashboardService.mailsFromAndTo()
                .pipe(
                    map((resp) => {
                        return dashboardActions.getMailFromSucces({
                            mails: resp
                        })
                    }),
                ))
    ));
    loadMailHam$ = createEffect(() => this.actions$.pipe(
        ofType(dashboardActions.getMailHamRequest),
        switchMap(() =>
            this.dashboardService.mailsHam()
                .pipe(
                    map((resp) => {
                        
                        return dashboardActions.getMailHamSuccess({
                            mails: resp.data.normal_mail
                        })
                    }),
                ))
    ));
    loadMailSpam$ = createEffect(() => this.actions$.pipe(
        ofType(dashboardActions.getMailSpamRequest),
        switchMap(() =>
            this.dashboardService.mailsSpam()
                .pipe(
                    map((resp) => {
                        return dashboardActions.getMailSpamSuccess({
                            mails: resp.data.spam_mails
                        })
                    }),
                ))
    ));
    loadMailAlert$ = createEffect(() => this.actions$.pipe(
        ofType(dashboardActions.getMailAlertRequest),
        switchMap(() =>
            this.dashboardService.alertsSentUser()
                .pipe(
                    map((resp) => {
                        return dashboardActions.getMailAlertSuccess({
                            mails: resp.data.alert_user
                        })
                    }),
                ))
    ));
    loadMailReport$ = createEffect(() => this.actions$.pipe(
        ofType(dashboardActions.getMailReportRequest),
        switchMap(() =>
            this.dashboardService.mailsReportsHowSpam()
                .pipe(
                    map((resp) => {
                        return dashboardActions.getMailReportSuccess({
                            mails: resp.data.mails
                        })
                    }),
                ))
    ));


    constructor(
        private actions$: Actions,
        private dashboardService: DashboardService,
        private route: Router,
        private generalService: GeneralService,

    ) { }
}
