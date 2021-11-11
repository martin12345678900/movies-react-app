import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { UserAuthSliceState, UserAuth, UserDataObjType} from './auth-slice.types';

const defaultAuthState: UserAuthSliceState = {
    isAuthenticated: false,
    userAuthState: {
        accessToken: null,
        _id: null,
        username: null
    },
};

const authSlice = createSlice({
    name: 'auth-slice',
    initialState: defaultAuthState,
    reducers: {
        handleLogout(state) {
            state.userAuthState = defaultAuthState.userAuthState;
            state.isAuthenticated = defaultAuthState.isAuthenticated;
        },
        handleSign(state, { payload }: PayloadAction<UserAuth>) {
            state.isAuthenticated = true;
            state.userAuthState = {
                accessToken: payload.accessToken,
                _id: payload._id,
                username: payload.username
            }
        }
    }
});


export const authThunk = ({ user, endpoint }: { user: UserDataObjType; endpoint: string;}) => {
    return async (dispatch: Dispatch<PayloadAction<UserAuth>>): Promise<void> => {
        try {
            const res = await fetch(`https://cars-react-app-server.herokuapp.com/users/${endpoint.toLowerCase()}`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" }
            });
    
            const userData: UserAuth = await res.json();
    
            dispatch(authSlice.actions.handleSign(userData));
        } catch (err) {
            console.log(err);
        }
    }
}

export const { handleLogout, handleSign } = authSlice.actions;

export default authSlice.reducer;