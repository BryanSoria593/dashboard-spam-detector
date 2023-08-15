import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/modules/auth/service/auth-service.service';
import { GeneralService } from 'src/app/modules/services/general.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import * as authActions from 'src/app/state/actions/auth.actions';

@Injectable()
export class authEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.loginRequest),
            switchMap(({ credentials }) =>
                this.authService.login(credentials.email, credentials.password).pipe(
                    map((resp) => {
                        this.cookieService.set('token', resp.data.token, 2, '/');
                        this.router.navigate(['/dashboard/']);
                        return authActions.loginSuccess({ user: resp });
                    }),
                    catchError((err) => {
                        console.log(err);
                        this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                        return [authActions.loginError({ error: err.error.message })];
                    })
                )
            )
        )
    );
    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.registerRequest),
            switchMap(({ credentials }) => {
                const dialogRef = this.generalService.openDialogLoading('fa-solid fa-spinner fa-spin', 'text-blue-500');
                return this.authService.register(credentials.username, credentials.email, credentials.password, credentials.confirmPassword).pipe(
                    map((resp) => {
                        dialogRef.close();
                        this.generalService.openDialogGeneric(resp.message, 'fa-solid fa-check', 'text-green-500');
                        setTimeout(() => {
                            this.router.navigate(['/auth/']);
                        }, 3000);
                        return authActions.registerSuccess();
                    }),
                    catchError((err) => {
                        dialogRef.close();
                        setTimeout(() => {
                            this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                        }, 1000);

                        return [authActions.loginError({ error: err.error.message })];
                    })
                );
            })
        )
    );

    persistUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.persistUser),
            map(({ user }) => {
                return authActions.loginSuccess({ user: user });
            }),
            catchError((err) => {
                this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                return [authActions.loginError({ error: err.error.message })];
            })
        )
    );

    updateInfoUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.updateProfileRequest),
            switchMap(({ credentials }) => {
                const dialogRef = this.generalService.openDialogLoading('fa-solid fa-spinner fa-spin', 'text-blue-500');
                return this.userService.updateProfile(
                    credentials.currentUsername,
                    credentials.currentEmail,
                    credentials.newUsername,
                    credentials.newEmail,
                    credentials.password
                ).pipe(
                    map((resp) => {
                        dialogRef.close();
                        this.cookieService.delete('token', '/');
                        this.cookieService.set('token', resp.data.token, 2, '/');
                        this.generalService.openDialogGeneric('Información actualizada', 'fa-solid fa-check', 'text-green-500');
                        return authActions.loginSuccess({ user: resp });
                    }),
                    catchError((err) => {
                        dialogRef.close();
                        this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                        return [authActions.loginError({ error: err.error.message })];
                    })
                );
            })
        )
    );

    updatePassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.updatePasswordRequest),
            switchMap(({ credentials }) => {
                const dialogRef = this.generalService.openDialogLoading('fa-solid fa-spinner fa-spin', 'text-blue-500');
                return this.userService.updatePassword(
                    credentials.email,
                    credentials.currentPassword,
                    credentials.newPassword,
                    credentials.confirmNewPassword,
                ).pipe(
                    map((resp) => {
                        dialogRef.close();
                        this.cookieService.delete('token', '/');
                        this.generalService.openDialogGeneric(resp.message, 'fa-solid fa-check', 'text-green-500');
                        setTimeout(() => {
                            this.router.navigate(['/auth/login']);
                        }, 3000);
                        return authActions.updatePasswordSuccess();
                    }),
                    catchError((err) => {
                        console.log(err);

                        dialogRef.close();
                        this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                        return [authActions.loginError({ error: err.error.message })];
                    })
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private generalService: GeneralService,
        private authService: AuthServiceService,
        private userService: UserService,
        private cookieService: CookieService,
        private router: Router,

    ) { }

}
