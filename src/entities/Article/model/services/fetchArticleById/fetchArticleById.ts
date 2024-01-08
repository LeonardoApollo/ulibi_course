import { createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';

import { Article } from '../../types/article';

export const fetcArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>(
    'articleDetails/fetcArticleById',
    async (articleId, { extra, rejectWithValue }) => {
        try {
            const articleSnap = await getDoc(doc(db, 'articles', articleId));
            if (!articleSnap.exists) {
                throw new Error('article dont exist');
            }
            const articleData = articleSnap.data();
            const userSnap = await getDoc(
                articleData!.user as any as DocumentReference,
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
            const article: Article = {
                id: articleSnap.id,
                user,
                title: articleData!.title,
                subtitle: articleData!.subtitle,
                img: articleData!.img,
                views: articleData!.views,
                createdAt: articleData!.createdAt,
                type: articleData!.type,
                blocks: articleData!.blocks,
            };
            return article;
            // const response = await extra.api.get<Article>(
            //     `/articles/${articleId}`,
            //     {
            //         params: {
            //             _expand: 'user',
            //         },
            //     },
            // );

            // if (!response.data) {
            //     throw new Error();
            // }

            // return response.data;
        } catch (error) {
            const e = error as Error;
            if (__PROJECT__ === 'frontend') {
                console.log(e);
            }
            return rejectWithValue(`${e.message}`);
        }
    },
);
