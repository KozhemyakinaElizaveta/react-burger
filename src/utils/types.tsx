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
    key?: string,
}

export type TCurIngredient = {
    key?: number | null | string,
    ingredient: TIngredient
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

export type TAuthInitialState = {
    user: TUserData | null | undefined;
    register: boolean;
    registerFailed: boolean;
    registerSuccess: boolean;
    login: boolean;
    loginFailed: boolean;
    loginSuccess: boolean;
    logout: boolean;
    logoutFailed: boolean;
    logoutSuccess: boolean;
    getUser: boolean;
    getUserSuccess: boolean;
    getUserFailed: boolean;
    patchUser: boolean;
    patchUserSuccess: boolean;
    patchUserFailed: boolean;
}

export type TResetPasswordInitialState = {
    resetPassword: boolean;
    resetPasswordFailed: boolean;
    resetPasswordSuccess: boolean;
}

export type TSendResetEmailInitialState = {
    sendResetEmail: boolean;
    sendResetEmailFailed: boolean;
    sendResetEmailSuccess: boolean;
}

export type TReturnUrlInitialState = {
    url: string
}

export type TIngredientsInitialState = {
    ingredients: Array<TIngredient>;
    bunIngredient: TIngredient | null;
}

export type TConstructorItemsInitialState = {
    constructorIngredients: { bun: TIngredient | null, innerIngredients: Array<TIngredient> }
}

export type TFeedOrder = {
    _id: string,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    ingredients: string[]
}

export type TFeedMessage = {
    success: boolean
    orders: TFeedOrder[]
    total: number
    totalToday: number
}