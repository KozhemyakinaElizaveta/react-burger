type TUserData = {
    name: string;
    email: string;
    password: string;
}

type TLoginData = {
    email: string;
    password: string;
}

type TResetEmailData = {
    email: string;
}

type TResetData = {
    password: string;
    token: string;
}

type TPatchUserData = {
    name?: string;
    email?: string;
    password?: string;
}

type TFetchRes = {
    json(): Promise<any>;
    ok?: boolean;
    status: number;
}

type TFetchResJson = {
    message?: string;
    success?: boolean;
    accessToken?: string;
    refreshToken?: string;
    order?: TOrder;
    data?: Array<TIngredient>;
    user?: TUserData;
}

type TFetchOptions = {
    headers?: HeadersInit | undefined;
    method?: string;
    body?: string;
}

type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    uuid?: string
}

type TOrder = {
    number: string
}

export type {
    TUserData,
    TLoginData,
    TResetEmailData,
    TResetData,
    TPatchUserData,
    TFetchRes,
    TFetchResJson,
    TFetchOptions,
    TIngredient,
    TOrder
}