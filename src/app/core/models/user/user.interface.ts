export interface LoginModel {
    email: string,
    password: string,
}
export interface RegisterModel{
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface UserModel {
    data:{
        token: string;
        username: string;
        email: string;
    },
    message: string,
    ok: boolean,    
}

export interface ValidatePasswordModel {
    email: string,
    password: string,
}

export interface UpdateProfileModel {
    currentUsername: string,
    currentEmail: string,
    newUsername: string,
    newEmail: string,
    password: string,
    
}
export interface updatePasswordModel {
    email: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string,
}

