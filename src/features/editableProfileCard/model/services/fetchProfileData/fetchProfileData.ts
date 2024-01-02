import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Profile } from '@/entities/Profile';

import { db } from '@/shared/config/firebase/firebase';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, { extra, rejectWithValue }) => {
    try {
        const profileDataRef = doc(db, 'users', profileId);
        const docData = (await getDoc(profileDataRef)).data();
        const profile: Profile = await docData!.profile;
        return profile;
        // const response = await extra.api.get<Profile>(`/profile/${profileId}`);

        // if (!response.data) {
        //     throw new Error();
        // }

        // return response.data;
    } catch (error) {
        if (__PROJECT__ === 'frontend') {
            console.log(error);
        }
        return rejectWithValue('error');
    }
});
