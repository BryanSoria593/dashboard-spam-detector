import { createSelector } from "@ngrx/store";
import { ListFilterState  } from "src/app/core/models/list-filter/list-filter.state";
import { AppState } from "../app.state";


export const selectStateListFilter = (state: AppState) => state.listFilter

export const selectLoading = createSelector(
    selectStateListFilter,
    (state: ListFilterState) => state.loading
)

export const selectWhiteUsersFilter = createSelector(
    selectStateListFilter,
    (state: ListFilterState) => state.whiteListUsers
)
export const selectBlackUsersFilter = createSelector(
    selectStateListFilter,
    (state: ListFilterState) => state.blackListUsers
)



    