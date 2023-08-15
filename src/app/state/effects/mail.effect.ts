import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { CookieService } from 'ngx-cookie-service';
import { catchError,  map, switchMap } from 'rxjs/operators';

import { DashboardService } from 'src/app/modules/dashboard/services/dashboard.service';

import { GeneralService } from 'src/app/modules/services/general.service';

import * as MailActions from 'src/app/state/actions/mail.action';


@Injectable()
export class MailEffects {
  loadMail$ = createEffect(() => this.actions$.pipe(
    ofType(MailActions.getMailRequest),
    switchMap(() =>
      this.dashboardService.mails()
        .pipe(
          map((resp) => {
            return MailActions.getMailSucces({
              mails: resp.mails
            })
          }),
          catchError((error) => {
            this.generalService.openDialogGeneric(error.error.message, 'fa-solid fa-xmark', 'text-red-500');
            return [MailActions.mailError({ error: error.error.message })];
          })
        ),
    )
  ));

  




  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private route: Router,
    private generalService: GeneralService,

  ) { }
}
