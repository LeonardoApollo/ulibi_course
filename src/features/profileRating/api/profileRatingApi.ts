import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';

import { Rating } from '@/entities/Rating';

import { db } from '@/shared/config/firebase/firebase';

interface GetProfileRatingArg {
    userId: string;
    profileId: string;
}

interface RateProfileArg extends GetProfileRatingArg {
    rate: number;
    feedback?: string;
}

// const profileRatingApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getProfileRating: build.query<Rating[], GetProfileRatingArg>({
//             query: ({ profileId, userId }) => ({
//                 url: '/profile-ratings',
//                 params: {
//                     userId,
//                     profileId,
//                 },
//             }),
//         }),
//         rateProfile: build.mutation<void, RateProfileArg>({
//             query: (arg) => ({
//                 url: '/profile-ratings',
//                 method: 'POST',
//                 body: arg,
//             }),
//         }),
//     }),
// });

// export const useProfileRating = profileRatingApi.useGetProfileRatingQuery;
// export const useRateProfile = profileRatingApi.useRateProfileMutation;

export const profileRatingApi = createApi({
    reducerPath: 'profileRatingApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getProfileRating: build.query<Rating[], GetProfileRatingArg>({
            queryFn: async ({ profileId }) => {
                try {
                    const ratings: Rating[] = [];
                    const ratingsData = await getDocs(
                        collection(db, 'users', profileId, 'ratings'),
                    );
                    if (ratingsData.empty) {
                        return { data: ratings };
                    }
                    ratingsData.forEach((doc) => {
                        const docData = doc.data();
                        const rating = {
                            rate: docData.rate,
                            feedback: docData.feetback,
                        };
                        ratings.push(rating);
                    });

                    return { data: ratings };
                } catch (error) {
                    return { error };
                }
            },
        }),
        rateProfile: build.mutation<void, RateProfileArg>({
            queryFn: async ({ profileId, userId, rate, feedback }) => {
                try {
                    const ratingsRef = collection(
                        db,
                        'users',
                        profileId,
                        'ratings',
                    );
                    const rating = {
                        rate,
                        feetback: feedback,
                        user: doc(db, 'users', userId),
                    };
                    await addDoc(ratingsRef, rating);
                    return { data: undefined };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

export const useProfileRating = profileRatingApi.useGetProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
