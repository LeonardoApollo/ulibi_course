import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    DocumentReference,
    collection,
    getDoc,
    getDocs,
    limit,
    query,
} from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';
import { User } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';

export const fetchArticleRecommnedations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesDetailsPage/fetchArticleRecommnedations',
    async (_, { extra, rejectWithValue }) => {
        try {
            const recs: Article[] = [];
            const recQuery = query(collection(db, 'articles'), limit(4));
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
            return recs;
            // const response = await extra.api.get<Article[]>('/articles', {
            //     params: {
            //         _expand: 'user',
            //         _limit: 4,
            //     },
            // });

            // if (!response.data) {
            //     throw new Error();
            // }

            // return response.data;
        } catch (error) {
            const e = error as Error;
            console.log(e.message);
            return rejectWithValue(`${e.message}`);
        }
    },
);
