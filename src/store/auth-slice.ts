import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { WritableDraft } from '@reduxjs/toolkit/node_modules/immer/dist/internal';

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
        handleLogout(state: WritableDraft<UserAuthSliceState>) {
            state.userAuthState = defaultAuthState.userAuthState;
            state.isAuthenticated = defaultAuthState.isAuthenticated;
        },
        handleSign(state: WritableDraft<UserAuthSliceState>, { payload }: PayloadAction<UserAuth>) {
            state.isAuthenticated = true;
            state.userAuthState = {
                accessToken: payload.accessToken,
                _id: payload._id,
                username: payload.username
            }
        }
    }
});

const baseAuthURL = 'https://cars-react-app-server.herokuapp.com/users';

export const authThunk = ({ user, endpoint }: { user: UserDataObjType; endpoint: string;}) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            const res = await fetch(`${baseAuthURL}/${endpoint.toLowerCase()}`, {
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

export const logoutThunk = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            await fetch(`${baseAuthURL}/logout`);

            dispatch(authSlice.actions.handleLogout());
        } catch (err) {
            console.log(err);
        }
    }
}

export default authSlice.reducer;