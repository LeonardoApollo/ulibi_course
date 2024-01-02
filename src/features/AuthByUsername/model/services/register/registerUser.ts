import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Profile } from '@/entities/Profile';
import { User, UserRole, userActions } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';
import { USERNAME_ALREADY_EXIST } from '@/shared/const/errors';
import { Theme } from '@/shared/const/theme';

interface LoginByUsernameProps {
    username: string;
    email: string;
    password: string;
}

export const registerUser = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'register/registerUser',
    async (authData, { dispatch, extra, rejectWithValue }) => {
        const auth = getAuth();
        try {
            const initDataRef = doc(db, 'initUsers', authData.username);
            const initData = await getDoc(initDataRef);
            if (initData.exists()) {
                throw new Error(USERNAME_ALREADY_EXIST);
            } else {
                await setDoc(initDataRef, {
                    email: authData.email,
                });
            }
            const { user } = await createUserWithEmailAndPassword(
                auth,
                authData.email,
                authData.password,
            );
            if (!user) {
                throw new Error('error data');
            }
            const id = user.uid;
            const { username } = authData;
            const docRef = collection(db, 'users');
            const token = user.refreshToken;
            const initProfile: Profile = {
                username,
                id,
            };
            const initialData = {
                username,
                email: authData.email,
                avatar: '',
                roles: [UserRole.USER],
                features: {
                    isAppRedesigned: true,
                    isArticleRatingEnabled: true,
                },
                jsonSettings: {
                    isArticlePageWasOpend: false,
                    isFirstVisit: true,
                    settingsPageHasBeenOpen: false,
                    theme: Theme.LIGHT,
                },
                profile: initProfile,
            };
            await setDoc(doc(docRef, id), initialData);
            const userData: User = {
                id,
                token,
                ...initialData,
            };
            dispatch(userActions.setAuthData(userData));
            return userData;
        } catch (e) {
            const error = e as Error;
            if (__PROJECT__ === 'frontend') {
                console.log(error.message);
            }
            return rejectWithValue(`${error.message}`);
        }
    },
);
