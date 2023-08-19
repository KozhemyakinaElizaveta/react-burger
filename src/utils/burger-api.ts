import { getItem, setItem } from './local-storage';
import {BURGER_API_URL} from './const';
import { TUserData, TLoginData, TResetEmailData, TResetData, TPatchUserData,  TFetchRes, TFetchResJson, TFetchOptions } from '../utils/types';

const checkResponse = (res: TFetchRes): Promise<any> => {
    return res.ok
        ? res.json()
        : res.json().then(() => Promise.reject(res.status));
};

const checkSuccess = (res: TFetchResJson): Promise<any> | TFetchResJson => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Error: ${res?.message}`);
};

export const request = (endpoint: string, options: TFetchOptions | undefined = undefined, withAuth: boolean = false) => {
    return fetch(`${BURGER_API_URL}${endpoint}`, options)
        .then((res) => checkJwtExpired(res, endpoint, options, withAuth))
        .then(checkResponse)
        .then(checkSuccess);
};

const checkJwtExpired = (res: TFetchRes, endpoint: string, options: TFetchOptions | undefined, withAuth: boolean): TFetchRes | Promise<Response> => {
    if (!withAuth) {
        return res;
    }
    if (res.ok) {
    return res;
    }
    else if (res.status === 403) {
        return new Promise(function (resolve, reject) {
            res.json().then((res: TFetchResJson) => {
            if (res.message === 'jwt expired') {
                const tokenOptions: any = {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Authorization': getItem('burgerAccessToken') },
                body: JSON.stringify({ token: getItem('burgerRefreshToken') })
                }
                request('auth/token', tokenOptions, false).then((res) => {
                if (res.success) {
                    setItem('burgerAccessToken', res.accessToken)
                    setItem('burgerRefreshToken', res.refreshToken)
                    resolve(fetch(`${BURGER_API_URL}${endpoint}`, {
                    ...options, headers: { ...options?.headers, 'Authorization': getItem('burgerAccessToken') }
                    }))
                } else {
                    reject(Promise.reject(`Не удалось обновить токен: ${res}`));
                }
                })
            } else {
                reject(Promise.reject(`Не удалось обновить токен: ${res}`));
            }
            })
        })
    } else {
        return res;
    }
}

export const refreshToken = () => {
    return request(`${BURGER_API_URL}/auth/token`, {
        method: "POST",
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    });
};

export const registerRequest = (userData: TUserData) => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }
    return request('auth/register', options)
}

export const loginRequest = (loginData: TLoginData) => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    }
    return request('auth/login', options)
}

export const logoutRequest = () => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': getItem('burgerAccessToken') },
        body: JSON.stringify({ token: getItem('burgerRefreshToken') })
    }
    return request('auth/logout', options)
}

export const sendResetEmailRequest = (resetEmailData: TResetEmailData) => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetEmailData)
    }
    return request('password-reset', options)
}

export const resetPasswordRequest = (resetData: TResetData) => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetData)
    }
    return request('password-reset/reset', options)
}

export const getUserRequest = () => {
    const options = {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': getItem('burgerAccessToken') }
    }
    return request('auth/user', options, true)
}

export const updateUser = (patchUserData: TPatchUserData) => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': getItem('burgerAccessToken') },
        body: JSON.stringify(patchUserData)
    }
    return request('auth/user', options, true)
}