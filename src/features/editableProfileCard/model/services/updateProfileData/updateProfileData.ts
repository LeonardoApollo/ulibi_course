import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Profile } from '@/entities/Profile';
import { getUserAuthData, userActions } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';

import { ValidateProfileError } from '../../consts/consts';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>(
    'profile/updateProfileData',
    async (_, { extra, rejectWithValue, getState, dispatch }) => {
        const formData = getProfileForm(getState());
        const user = getUserAuthData(getState());

        const errors = validateProfileData(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const profile = formData;
            if (!user || !profile || !profile.username) {
                throw new Error();
            }
            const userDataRef = doc(db, 'users', user.id);
            const userInitRef = doc(db, 'initUsers', user.username);
            await updateDoc(userDataRef, {
                avatar: profile.avatar,
                username: profile.username,
                profile,
            });
            await deleteDoc(userInitRef);
            await setDoc(doc(db, 'initUsers', profile.username), {
                email: user.email,
            });
            const articlesQuery = query(
                collection(db, 'articles'),
                where('userId', '==', user.id),
            );
            const articlesSnap = await getDocs(articlesQuery);
            articlesSnap.forEach((doc) => {
                const data = doc.data();
                updateDoc(doc.ref, {
                    user: {
                        ...data!.user,
                        avatar: profile.avatar,
                        username: profile.username,
                    },
                });
            });
            dispatch(
                userActions.setAuthData({
                    ...user,
                    avatar: profile.avatar,
                    username: profile.username,
                }),
            );
            return profile;
            // const response = await extra.api.put<Profile>(
            //     `/profile/${formData?.id}`,
            //     formData,
            // );

            // if (!response.data) {
            //     throw new Error();
            // }

            // return response.data;
        } catch (error) {
            if (__PROJECT__ === 'frontend') {
                console.log(error);
            }
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
