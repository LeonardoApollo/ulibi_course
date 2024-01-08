import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { addDoc, collection, doc, getDocs } from 'firebase/firestore';

import { Rating } from '@/entities/Rating';

import { db } from '@/shared/config/firebase/firebase';

interface GetArticleRatingArg {
    userId: string;
    articleId: string;
}

interface RateArticleArg extends GetArticleRatingArg {
    rate: number;
    feedback?: string;
}

export const articleRatingApi = createApi({
    reducerPath: 'articleRatingApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRatingArg>({
            queryFn: async ({ articleId }) => {
                try {
                    const ratings: Rating[] = [];
                    const ratingsData = await getDocs(
                        collection(db, 'articles', articleId, 'ratings'),
                    );
                    if (ratingsData.empty) {
                        return { data: ratings };
                    }
                    ratingsData.forEach((doc) => {
                        const docData = doc.data();
                        const rating = {
                            rate: docData.rate,
                            feedback: docData.feetback,
                            userId: docData.userId,
                        };
                        ratings.push(rating);
                    });

                    return { data: ratings };
                } catch (error) {
                    return { error };
                }
            },
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            queryFn: async ({ articleId, userId, rate, feedback }) => {
                try {
                    const ratingsRef = collection(
                        db,
                        'articles',
                        articleId,
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

// const articleRatingApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getArticleRating: build.query<Rating[], GetArticleRatingArg>({
//             query: ({ articleId, userId }) => ({
//                 url: '/article-ratings',
//                 params: {
//                     userId,
//                     articleId,
//                 },
//             }),
//         }),
//         rateArticle: build.mutation<void, RateArticleArg>({
//             query: (arg) => ({
//                 url: '/article-ratings',
//                 method: 'POST',
//                 body: arg,
//             }),
//         }),
//     }),
// });

export const useArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
