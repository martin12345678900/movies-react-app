export type UserAuth = {
    accessToken: string | null;
    _id: string | null;
    username: string | null;
}

export type UserDataObjType = {
    email: string;
    password: string;
    username?: string;
}

export type ExtraDataType = {
    endpoint: string;
    userDataObj: UserDataObjType;
}

export type UserAuthSliceState = { userAuthState: UserAuth } & { isAuthenticated: boolean; }
