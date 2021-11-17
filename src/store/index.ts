import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import storage from 'redux-persist/lib/storage/session'

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import authSliceReducer from "./auth-slice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const persistedReducer = persistReducer(persistConfig, authSliceReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AuthDetails = {
    authToken: string;
    userId?: string;
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAuthDetails = (): AuthDetails => {
    const { accessToken: authToken, _id: userId } = useAppSelector(state => state.userAuthState);

    return {
        authToken,
        userId
    };
}


export default store;