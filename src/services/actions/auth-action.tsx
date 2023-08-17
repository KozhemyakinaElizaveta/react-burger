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

import { TFetchResJson, TUserData } from '../../utils/types';

export function register() {
    return {
        type: REGISTER
    }
}

export function registerSuccess(data: TFetchResJson) {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

export function registerFailed() {
    return {
        type: REGISTER_FAILED
    }
}

export function login() {
    return {
        type: LOGIN
    }
}

export function loginSuccess(data: TFetchResJson) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export function logoutFailed() {
    return {
        type: LOGOUT_FAILED
    }
}

export function sendResetEmail() {
    return {
        type: SEND_RESET_EMAIL
    }
}

export function sendResetEmailSuccess() {
    return {
        type: SEND_RESET_EMAIL_SUCCESS,
    }
}

export function sendResetEmailFailed() {
    return {
        type: SEND_RESET_EMAIL_FAILED
    }
}

export function resetPassword() {
    return {
        type: RESET_PASSWORD
    }
}

export function resetPasswordSuccess() {
    return {
        type: RESET_PASSWORD_SUCCESS,
    }
}

export function resetPasswordFailed() {
    return {
        type: RESET_PASSWORD_FAILED
    }
}

export function getUser() {
    return {
        type: GET_USER
    }
}

export function getUserFailed() {
    return {
        type: GET_USER_FAILED
    }
}

export function getUserSuccess(data: TUserData | undefined) {
    return {
        type: GET_USER_SUCCESS,
        payload: data
    }
}

export function patchUser() {
    return {
        type: PATCH_USER
    }
}

export function patchUserFailed() {
    return {
        type: PATCH_USER_FAILED
    }
}

export function patchUserSuccess(data: TFetchResJson) {
    return {
        type: PATCH_USER_SUCCESS,
        payload: data
    }
}

export function addReturnUrl(data: string) {
    return {
        type: ADD_RETURN_URL,
        payload: data
    }
}