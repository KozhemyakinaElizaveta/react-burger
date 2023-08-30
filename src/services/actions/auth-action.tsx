import { TFetchResJson, TUserData } from '../../utils/types';

export const REGISTER = 'REGISTER';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const SEND_RESET_EMAIL = 'SEND_RESET_EMAIL';
export const SEND_RESET_EMAIL_FAILED = 'SEND_RESET_EMAIL_FAILED';
export const SEND_RESET_EMAIL_SUCCESS = 'SEND_RESET_EMAIL_SUCCESS';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

export const GET_USER = 'GET_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const PATCH_USER = 'PATCH_USER';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';

export const ADD_RETURN_URL = 'ADD_RETURN_URL';

export interface IRegister {
    readonly type: typeof REGISTER;
}

export interface IRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS;
    readonly payload: TFetchResJson
}

export interface IRegisterFailed {
    readonly type: typeof REGISTER_FAILED;
}

export interface ILogin {
    readonly type: typeof LOGIN;
}

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    readonly payload: TFetchResJson
}

export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED;
}

export interface ILogout {
    readonly type: typeof LOGOUT;
}

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED;
}

export interface ISendResetEmail {
    readonly type: typeof SEND_RESET_EMAIL;
}


export interface ISendResetEmailSuccess {
    readonly type: typeof SEND_RESET_EMAIL_SUCCESS;
}


export interface ISendResetEmailFailed {
    readonly type: typeof SEND_RESET_EMAIL_FAILED;
}

export interface IResetPassword {
    readonly type: typeof RESET_PASSWORD;
}


export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}


export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IGetUser {
    readonly type: typeof GET_USER;
}

export interface IGetUserFailed {
    readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS;
    payload: TUserData | undefined;
}

export interface IGetUser {
    readonly type: typeof GET_USER;
}

export interface IGetUserFailed {
    readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS;
    payload: TUserData | undefined;
}

export interface IPatchUser {
    readonly type: typeof PATCH_USER;
}

export interface IPatchUserFailed {
    readonly type: typeof PATCH_USER_FAILED;
}

export interface IPatchUserSuccess {
    readonly type: typeof PATCH_USER_SUCCESS;
    payload: TFetchResJson;
}

export interface IAddReturnUrl {
    readonly type: typeof ADD_RETURN_URL;
    payload: string;
}

export type TAddReturnUrlActions = | IAddReturnUrl;

export type TSendResetEmailActions =
    | ISendResetEmail
    | ISendResetEmailFailed
    | ISendResetEmailSuccess;

export type TResetPasswordActions =
    | IResetPassword
    | IResetPasswordFailed
    | IResetPasswordSuccess;

export type TAuthActions =
    | IRegister
    | IRegisterFailed
    | IRegisterSuccess
    | ILogin
    | ILoginFailed
    | ILoginSuccess
    | ILogout
    | ILogoutFailed
    | ILogoutSuccess
    | IGetUser
    | IGetUserFailed
    | IGetUserSuccess
    | IPatchUser
    | IPatchUserFailed
    | IPatchUserSuccess


export function register(): IRegister {
    return {
        type: REGISTER
    }
}

export function registerSuccess(data: TFetchResJson): IRegisterSuccess {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

export function registerFailed(): IRegisterFailed {
    return {
        type: REGISTER_FAILED
    }
}

export function login(): ILogin {
    return {
        type: LOGIN
    }
}

export function loginSuccess(data: TFetchResJson): ILoginSuccess {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export function loginFailed(): ILoginFailed {
    return {
        type: LOGIN_FAILED
    }
}

export function logout(): ILogout {
    return {
        type: LOGOUT
    }
}

export function logoutSuccess(): ILogoutSuccess {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export function logoutFailed(): ILogoutFailed {
    return {
        type: LOGOUT_FAILED
    }
}

export function sendResetEmail(): ISendResetEmail {
    return {
        type: SEND_RESET_EMAIL
    }
}

export function sendResetEmailSuccess(): ISendResetEmailSuccess {
    return {
        type: SEND_RESET_EMAIL_SUCCESS,
    }
}

export function sendResetEmailFailed(): ISendResetEmailFailed {
    return {
        type: SEND_RESET_EMAIL_FAILED
    }
}

export function resetPassword(): IResetPassword {
    return {
        type: RESET_PASSWORD
    }
}

export function resetPasswordSuccess(): IResetPasswordSuccess {
    return {
        type: RESET_PASSWORD_SUCCESS,
    }
}

export function resetPasswordFailed(): IResetPasswordFailed {
    return {
        type: RESET_PASSWORD_FAILED
    }
}

export function getUser(): IGetUser {
    return {
        type: GET_USER
    }
}

export function getUserFailed(): IGetUserFailed {
    return {
        type: GET_USER_FAILED
    }
}

export function getUserSuccess(data: TUserData | undefined): IGetUserSuccess {
    return {
        type: GET_USER_SUCCESS,
        payload: data
    }
}

export function patchUser(): IPatchUser {
    return {
        type: PATCH_USER
    }
}

export function patchUserFailed(): IPatchUserFailed {
    return {
        type: PATCH_USER_FAILED
    }
}

export function patchUserSuccess(data: TFetchResJson): IPatchUserSuccess {
    return {
        type: PATCH_USER_SUCCESS,
        payload: data
    }
}

export function addReturnUrl(data: string): IAddReturnUrl {
    return {
        type: ADD_RETURN_URL,
        payload: data
    }
}