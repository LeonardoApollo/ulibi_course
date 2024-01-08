import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
    DocumentReference,
    collection,
    getDoc,
    getDocs,
    limit,
    query,
} from 'firebase/firestore';

import { Article } from '@/entities/Article';
import { User } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';

export const recommendationsApi = createApi({
    reducerPath: 'recommendationsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            queryFn: async (qLimit) => {
                try {
                    const recs: Article[] = [];
                    const recQuery = query(
                        collection(db, 'articles'),
                        limit(qLimit),
                    );
                    const recSnap = await getDocs(recQuery);
                    recSnap.forEach((doc) => {
                        const data = doc.data();
                        recs.push({
                            id: doc.id,
                            user: data!.user,
                            title: data!.title,
                            subtitle: data!.subtitle,
                            img: data!.img,
                            views: data!.views,
                            createdAt: data!.createdAt,
                            type: data!.type,
                            blocks: data!.blocks,
                        });
                    });
                    // eslint-disable-next-line
                    for await (const rec of recs) {
                        const userSnap = await getDoc(
                            rec.user as any as DocumentReference,
                        );
                        if (!userSnap.exists) {
                            throw new Error('user dont exist');
                        }
                        const userData = userSnap.data();
                        const user: Omit<User, 'token'> = {
                            id: userSnap.id,
                            username: userData!.username,
                            email: userData!.email,
                            avatar: userData!.avatar,
                        };
                        rec.user = user;
                    }
                    return { data: recs };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

// const recommendationsApi = rtkApi.injectEndpoints({
//     endpoints: (build) => ({
//         getArticleRecommendationsList: build.query<Article[], number>({
//             query: (limit) => ({
//                 url: '/articles',
//                 params: {
//                     _limit: limit,
//                     _expand: 'user',
//                 },
//             }),
//         }),
//     }),
// });

export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendationsListQuery;
