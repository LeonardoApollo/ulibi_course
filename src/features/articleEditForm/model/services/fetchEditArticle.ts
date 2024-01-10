import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';
import { User } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';

import { ValidateArticleError } from '../consts/consts';

export const fetchEditArticleData = createAsyncThunk<
    Article,
    string,
    ThunkConfig<ValidateArticleError[]>
>(
    'article/fetchEditArticleData',
    async (articleId, { extra, rejectWithValue }) => {
        try {
            const articleSnap = await getDoc(doc(db, 'articles', articleId));
            if (!articleSnap.exists) {
                throw new Error('article dont exist');
            }
            const articleData = articleSnap.data();
            const userSnap = await getDoc(articleData!.user);
            if (!userSnap.exists) {
                throw new Error('user dont exist');
            }
            const userData: any = userSnap.data();
            const user: Omit<User, 'token'> = {
                id: userSnap.id,
                username: userData!.username,
                avatar: userData!.avatar,
                email: userData!.email,
            };
            const article: Article = {
                id: articleSnap.id,
                title: articleData!.title,
                subtitle: articleData!.subtitle,
                img: articleData!.img,
                views: articleData!.views,
                createdAt: articleData!.createdAt,
                type: articleData!.type,
                blocks: articleData!.blocks,
                user,
            };
            return article;
            // const response = await extra.api.get<Article>(
            //     `/articles/${articleId}`,
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
            return rejectWithValue([ValidateArticleError.SERVER_ERROR]);
        }
    },
);
