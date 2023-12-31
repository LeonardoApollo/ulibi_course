import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User, userActions } from '@/entities/User';

import { db, getUserFromFirestore } from '@/shared/config/firebase/firebase';

interface LoginByUsernameProps {
    username: string;
    email?: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, { dispatch, extra, rejectWithValue }) => {
        const auth = getAuth();
        try {
            let email = '';
            if (
                authData.username.match(
                    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
                )
            ) {
                email = authData.username;
            } else {
                const initDataRef = doc(db, 'initUsers', authData.username);
                const initData = await getDoc(initDataRef);
                if (initData.exists()) {
                    const data = initData.data();
                    email = await data.email;
                } else {
                    throw new Error('error data');
                }
            }
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                authData.password,
            );
            if (!user) {
                throw new Error('error data');
            }
            const id = user.uid;
            const token = user.refreshToken;
            const userData: User = await getUserFromFirestore(
                db,
                'users',
                id,
                token,
            );
            dispatch(userActions.setAuthData(userData));
            return userData;
            // Способ через json-server
            // const response = await extra.api.post<User>('/login', authData);

            // if (!response.data) {
            //     throw new Error('error data');
            // }
            // dispatch(userActions.setAuthData(response.data));
            // return response.data;
        } catch (error) {
            if (__PROJECT__ === 'frontend') {
                console.log(error);
            }
            return rejectWithValue('error');
        }
    },
);
