import { createReducer, on } from "@ngrx/store";

import { ListFilterState } from "src/app/core/models/list-filter/list-filter.state";
import {
    deleteUserBlackListSuccess, deleteUserListRequest, deleteUserWhiteListSuccess, getUsersBlackListRequest, 
    getUsersBlackListSuccess, getUsersWhiteListRequest, getUsersWhiteListSuccess, postUserBlackListRequest,
    postUserBlackListSuccess, postUserWhiteListRequest, postUserWhiteListSuccess, updateUserBlackListRequest,
    updateUserBlackListSuccess, updateUserWhiteListRequest, updateUserWhiteListSuccess
} from "../actions/lists-filter.actions";

export const initialState: ListFilterState = {
    loading: true,
    whiteListUsers: [],
    blackListUsers: [],
};

// Reducer de Login
export const _listFilterReducer = createReducer(
    initialState,
    on(getUsersWhiteListRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(getUsersWhiteListSuccess, (state, { users }) => {
        return {
            ...state,
            loading: false,
            whiteListUsers: users,

        }
    }),
    on(getUsersBlackListRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(getUsersBlackListSuccess, (state, { users }) => {
        return {
            ...state,
            loading: false,
            blackListUsers: users,
        }
    }),
    on(postUserWhiteListRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(postUserWhiteListSuccess, (state, { user }) => {
        return {
            ...state,
            loading: false,
            whiteListUsers: [...state.whiteListUsers, user],

        }
    }),

    on(postUserBlackListRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(postUserBlackListSuccess, (state, { user }) => {
        return {
            ...state,
            loading: false,
            blackListUsers: [...state.blackListUsers, user],
        }
    }),
    on(deleteUserListRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),

    on(deleteUserWhiteListSuccess, (state, { _id }) => {
        return {
            ...state,
            loading: false,
            whiteListUsers: state.whiteListUsers.filter(item => item._id !== _id)
        }
    }),
    
    on(deleteUserBlackListSuccess, (state, { _id }) => {
        return {
            ...state,
            loading: false,
            blackListUsers: state.blackListUsers.filter(item => item._id !== _id)

        }
    }),
    on(updateUserWhiteListRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(updateUserWhiteListSuccess, (state, { userUpdate }) => {
        return {
            ...state,
            loading: false,

            whiteListUsers: state.whiteListUsers.map(item => item._id === userUpdate._id ? {
                ...item,
                email: userUpdate.email,
                username: userUpdate.username
            } : item)
        }
    }),
    on(updateUserBlackListRequest, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(updateUserBlackListSuccess, (state, { userUpdate }) => {
        return {
            ...state,
            loading: false,
            blackListUsers: state.blackListUsers.map(item => item._id === userUpdate._id ? {
                ...item,
                email: userUpdate.email,
                username: userUpdate.username
            } : item)
        }
    }),
    
    



);

