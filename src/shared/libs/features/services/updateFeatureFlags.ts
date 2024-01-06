import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { db } from '@/shared/config/firebase/firebase';
import { FeatureFlags } from '@/shared/types/featureFlags';

import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
    void,
    UpdateFeatureFlagOptions,
    ThunkConfig<string>
>('features/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const allFeatures = {
        ...getAllFeatureFlags(),
        ...newFeatures,
    };
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            features: allFeatures,
        });
        // await dispatch(
        //     updateFeatureFlagsMutation({
        //         userId,
        //         features: allFeatures,
        //     }),
        // );

        // Используется для обновления страницы, без forceUpdate
        window.location.reload();

        // setFeatureFlags(allFeatures);

        return undefined;
    } catch (error) {
        if (__PROJECT__ === 'frontend') {
            console.log(error);
        }
        return rejectWithValue('');
    }
});
