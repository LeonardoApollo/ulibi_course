import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User, userActions } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';

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
            let username = '';
            let email = '';
            let avatar = '';
            let roles = [];
            let jsonSettings = {};
            let features = {};
            if (
                authData.username.match(
                    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
                )
            ) {
                email = authData.username;
            } else {
                const q = query(
                    collection(db, 'users'),
                    where('username', '==', authData.username),
                );
                const qSnap = await getDocs(q);
                if (qSnap.empty) {
                    throw new Error('error data');
                }
                const data = qSnap.docs[0].data();
                username = await data.username;
                email = await data.email;
                avatar = await data.avatar;
                roles = await data.roles;
                jsonSettings = await data.jsonSettings;
                features = await data.features;
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
            if (!username && id) {
                const docRef = doc(db, 'users', id);
                const docData = (await getDoc(docRef)).data();
                username = await docData!.username;
                avatar = await docData!.avatar;
                roles = await docData!.roles;
                jsonSettings = await docData!.jsonSettings;
                features = await docData!.features;
            }
            const token = user.refreshToken;
            const userData: User = {
                id,
                email,
                token,
                username,
                avatar,
                roles,
                features,
                jsonSettings,
            };
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
