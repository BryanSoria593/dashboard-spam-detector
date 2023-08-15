import { FilterUserModel } from "./list-filter.interface";

export interface ListFilterState {
    loading: boolean,
    whiteListUsers: FilterUserModel[],
    blackListUsers: FilterUserModel[],
    
}