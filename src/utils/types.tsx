export type TIngredient = {
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
    uuid?: string,
    counter?: any,
    key?: number | null,
    ingredient?: any
}

export type TOrder = {
    number: string
}

export type TUserData = {
    name: string;
    email: string;
    password: string;
}

export type TLoginData = {
    email: string;
    password: string;
}

export type TResetEmailData = {
    email: string;
}

export type TResetData = {
    password: string;
    token: string;
}

export type TPatchUserData = {
    name?: string;
    email?: string;
    password?: string;
}

export type TFetchRes = {
    json(): Promise<any>;
    ok?: boolean;
    status: number;
}

export type TFetchResJson = {
    message?: string;
    success?: boolean;
    accessToken?: string;
    refreshToken?: string;
    order?: TOrder;
    data?: Array<TIngredient>;
    user?: TUserData;
}

export type TFetchOptions = {
    headers?: HeadersInit | any;
    method?: string;
    body?: string;
}