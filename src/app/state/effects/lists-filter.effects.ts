import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ListFilterService } from 'src/app/modules/dashboard/services/list-filter.service';



import { GeneralService } from 'src/app/modules/services/general.service';
import * as listFilterActions from 'src/app/state/actions/lists-filter.actions';


@Injectable()
export class ListFilterEffects {

    loadUsersWhiteFilter$ = createEffect(() => this.actions$.pipe(
        ofType(listFilterActions.getUsersWhiteListRequest),
        switchMap((action) =>
            this.listFilterService.getWhiteList(action.typeUser)
                .pipe(
                    map((resp) => {
                        return listFilterActions.getUsersWhiteListSuccess({
                            users: resp.data.mails
                        })

                    }),
                    catchError((err) => {
                        console.log(err);
                        this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                        return [listFilterActions.errorListFilter({ error: err.error.message })];
                    })

                )
        )
    ))

    loadUsersBlackFilter$ = createEffect(() => this.actions$.pipe(
        ofType(listFilterActions.getUsersBlackListRequest),
        switchMap((action) =>
            this.listFilterService.getBlackList(action.typeUser)
                .pipe(
                    map((resp) => {
                        return listFilterActions.getUsersBlackListSuccess({
                            users: resp.data.mails
                        })
                    }
                    ),

                )
        )
    ))

    postUserWhiteList$ = createEffect(() => this.actions$.pipe(
        ofType(listFilterActions.postUserWhiteListRequest),
        switchMap((action) =>
            this.listFilterService.postWhiteList(action.user, action.typeUser)
                .pipe(
                    map((resp) => {
                        return listFilterActions.postUserWhiteListSuccess({
                            user: resp.newUser
                        })
                    }))
        )
    ))

    postUserBlackList$ = createEffect(() => this.actions$.pipe(
        ofType(listFilterActions.postUserBlackListRequest),
        switchMap((action) =>
            this.listFilterService.postWhiteList(action.user, action.typeUser)
                .pipe(
                    map((resp) => {
                        return listFilterActions.postUserBlackListSuccess({
                            user: resp.newUser
                        })
                    }))
        )
    ))

    updateUserWhiteList$ = createEffect(() => this.actions$.pipe(
        ofType(listFilterActions.updateUserWhiteListRequest),
        switchMap((action) =>
            this.listFilterService.updateWhiteList(action.email, action.newEmail, action.newUsername)
                .pipe(
                    map((resp) => {
                        this.generalService.openDialogGeneric(resp.message, 'fa-solid fa-check', 'text-green-500');
                        return listFilterActions.updateUserWhiteListSuccess({
                            userUpdate: resp.updateUser
                        })
                    }),
                    catchError((err) => {
                        console.log(err);
                        this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                        return [listFilterActions.errorListFilter({ error: err.error.message })];
                    })
                    )
                    
        )
    ))

    updateUserBlackList$ = createEffect(() => this.actions$.pipe(
        ofType(listFilterActions.updateUserBlackListRequest),
        switchMap((action) =>
            this.listFilterService.updateWhiteList(action.email, action.newEmail, action.newUsername)
                .pipe(
                    map((resp) => {
                        this.generalService.openDialogGeneric(resp.message, 'fa-solid fa-check', 'text-green-500');
                        return listFilterActions.updateUserBlackListSuccess({
                            userUpdate: resp.updateUser
                        })
                    }),
                    catchError((err) => {
                        console.log(err);
                        this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                        return [listFilterActions.errorListFilter({ error: err.error.message })];
                    })
                    )
        )
    ))

    deleteUserWhiteList$ = createEffect(() => this.actions$.pipe(
        ofType(listFilterActions.deleteUserListRequest),
        switchMap((action) =>
            this.listFilterService.deleteWhiteList(action.userDelete.email)
                .pipe(
                    map((resp) => {
                        this.generalService.openDialogGeneric(resp.message, 'fa-solid fa-check', 'text-green-500');
                        return listFilterActions.deleteUserWhiteListSuccess({
                            _id: action.userDelete._id
                        })
                    }),
                    catchError((err) => {
                        this.generalService.openDialogGeneric(err.error.message, 'fa-solid fa-xmark', 'text-red-500');
                        return [listFilterActions.errorListFilter({ error: err.error.message })];
                    })
                )
        )
    ))


    constructor(
        private actions$: Actions,
        private listFilterService: ListFilterService,
        private route: Router,
        private generalService: GeneralService,

    ) { }
}
