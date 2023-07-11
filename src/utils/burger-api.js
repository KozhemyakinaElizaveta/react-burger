
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

export function request(url, options) {
    return fetch(url, options)
    .then(checkResponse)
    .then(checkSuccess);
}

