import { ActionReducerMap } from "@ngrx/store";
// INTERFACES
import { MailDashboardState, MailState } from "../core/models/mail/mail.state";

// REDUCERS
import {_mailReducer} from './reducers/mail.reducer';
import { _dashboardReducer } from "./reducers/dashboard.reducer";
import { UserState } from "../core/models/user/user.state";
import { _authReducer } from "./reducers/auth.reducer";
import {_listFilterReducer} from './reducers/list-filter.reducer';
import { ListFilterState } from "../core/models/list-filter/list-filter.state";


export interface AppState {
    auth: UserState;
    mail: MailState;
    dashboard: MailDashboardState;
    listFilter: ListFilterState;
}


export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    auth: _authReducer,
    mail: _mailReducer,
    dashboard: _dashboardReducer,
    listFilter: _listFilterReducer,
}

