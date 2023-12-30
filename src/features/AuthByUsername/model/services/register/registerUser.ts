import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User, UserRole, userActions } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';
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
            };
            await setDoc(doc(docRef, id), initialData);
            const userData: User = {
                id,
                token,
                ...initialData,
            };
            dispatch(userActions.setAuthData(userData));
            return userData;
        } catch (error) {
            if (__PROJECT__ === 'frontend') {
                console.log(error);
            }
            return rejectWithValue('error');
        }
    },
);
