import { getItem} from './local-storage';
import {BURGER_API_URL} from './const';
import { TUserData, TLoginData, TResetEmailData, TResetData, TPatchUserData,  TFetchRes, TFetchResJson, TFetchOptions } from '../utils/types';

type TServerResponse = {
    success: boolean,
    refreshToken?: string,
    accessToken?: string
};

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = <T extends TServerResponse>(url: string, options: RequestInit): Promise<T> => {
    return fetch(BURGER_API_URL + url, options)
        .then((res) => checkResponse<T>(res))
        .then((data) => {
            if (!data.success){
            throw new Error(`${(data as any).message}`);
            }
            return data
        });
};

export const refreshToken = <T extends TServerResponse>(): Promise<T> => {
    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }
    return request<T>(`${BURGER_API_URL}/auth/token`, options);
};

export const fetchWithRefresh = async <T extends TServerResponse>(url: string, options: RequestInit): Promise<T> => {
    try {
        return await request(BURGER_API_URL + url, options);
    } catch (err) {
        if ((err as Error).message === "jwt expired") {
            const refreshData = await refreshToken<T>(); 
            if (!refreshData.success) {
            return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", (refreshData as any).refreshToken);
            localStorage.setItem("accessToken", (refreshData as any).accessToken);
            const optionsRefresh = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: (refreshData as any).accessToken,
            },
            };
            return await request(BURGER_API_URL + url, optionsRefresh);
        } else {
            return Promise.reject(err);
        }
    }
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
    return request('auth/user', options)
}

export const updateUser = (patchUserData: TPatchUserData) => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': getItem('burgerAccessToken') },
        body: JSON.stringify(patchUserData)
    }
    return request('auth/user', options)
}