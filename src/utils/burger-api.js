import { getItem, setItem } from './local-storage';
import {BURGER_API_URL} from './const';

export const checkResponse = (res) => {
    return res.ok
        ? res.json()
        : res.json().then(() => Promise.reject(res.status));
};

export const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};

// export function request(url, options) {
//     return fetch(url, options)
//     .then(checkResponse)
//     .then(checkSuccess);
// }

export const request = ( endpoint, options, withAuth) => {
    return fetch(`${BURGER_API_URL}${endpoint}`, options)
        .then((res) => checkJwtExpired(res, endpoint, options, withAuth))
        .then(checkResponse)
        .then(checkSuccess);
};

const checkJwtExpired = (res, endpoint, options, withAuth) => {
    if (!withAuth) {
        return res;
    }
    if (res.ok) {
        return res;
    }
    else if (res.status === 403) {
        return new Promise(function (resolve, reject) {
        res.json().then((res) => {
            if (res.message === 'jwt expired') {
            const tokenOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json', 'Authorization': getItem('burgerAccessToken') },
                body: JSON.stringify({ token: getItem('burgerRefreshToken') })
            }
            request('auth/token', tokenOptions).then((res) => {
                if (res.success) {
                    setItem('burgerAccessToken', res.accessToken)
                    setItem('burgerRefreshToken', res.refreshToken)
                    resolve(fetch(`${BURGER_API_URL}${endpoint}`, {
                    ...options, headers: { ...options.headers, 'Authorization': getItem('burgerAccessToken') }
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

export const registerRequest = (data) => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    return request('auth/register', options)
}

export const loginRequest = (data) => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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

export const sendResetEmailRequest = (data) => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    return request('password-reset', options)
}

export const resetPasswordRequest = (data) => {
    const options = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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

export const patchUserRequest = (data) => {
    const options = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8', 'Authorization': getItem('burgerAccessToken') },
        body: JSON.stringify(data)
    }
    return request('auth/user', options, true)
}
