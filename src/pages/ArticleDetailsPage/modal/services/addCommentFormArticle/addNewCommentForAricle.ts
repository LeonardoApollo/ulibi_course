import { createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getArticleDetailsData } from '@/entities/Article';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';

import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addCommentForArticle',
    async (text, { dispatch, extra, rejectWithValue, getState }) => {
        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());
        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const commentsRef = collection(
                db,
                'articles',
                article.id,
                'comments',
            );
            const userRef = doc(db, 'users', userData.id);
            const commentRef = await addDoc(commentsRef, {
                user: userRef,
                text,
            });
            const commentSnap = await getDoc(commentRef);
            const comment: Comment = {
                id: commentSnap.id,
                user: {
                    id: userData.id,
                    username: userData.username,
                    email: userData.email,
                    avatar: userData.avatar ?? '',
                },
                text,
            };
            dispatch(fetchCommentsByArticleId(article.id));
            return comment;
            // const response = await extra.api.post<Comment>('/comments', {
            //     articleId: article.id,
            //     userId: userData.id,
            //     text,
            // });

            // if (!response.data) {
            //     throw new Error('error data');
            // }

            // dispatch(fetchCommentsByArticleId(article.id));

            // return response.data;
        } catch (error) {
            const e = error as Error;
            console.log(e.message);
            return rejectWithValue(`${e.message}`);
        }
    },
);
