export interface FilterUserModel {
    _id: string,
    email: string,
    username: string,
    date: {
        created: string,
    },
}

// export interface BlacklistModel {
//     id: string,
//     email: string,
//     username: string,
// }

// export interface WhitelistModel {
//     id: string,
//     email: string,
//     username: string,
// }

export interface NewUserModel {
    email: string,
    username: string,
}
