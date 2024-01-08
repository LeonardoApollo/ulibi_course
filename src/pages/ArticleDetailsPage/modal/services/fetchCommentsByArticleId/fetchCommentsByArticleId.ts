import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    DocumentReference,
    collection,
    getDoc,
    getDocs,
} from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Comment } from '@/entities/Comment';
import { User } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    'articleDetails/fetcCommentsByArticleId ',
    async (articleId, { extra, rejectWithValue }) => {
        if (!articleId) {
            return rejectWithValue('error');
        }

        try {
            const comments: Comment[] = [];
            const commentsSnap = await getDocs(
                collection(db, 'articles', articleId, 'comments'),
            );
            if (commentsSnap.empty) {
                throw new Error('no comments');
            }
            commentsSnap.forEach((doc) => {
                const data = doc.data();
                comments.push({
                    id: doc.id,
                    user: data!.user,
                    text: data!.text,
                });
            });
            // eslint-disable-next-line
            for await (const comment of comments) {
                const userSnap = await getDoc(
                    comment.user as any as DocumentReference,
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
                comment.user = user;
            }

            return comments;
            // const response = await extra.api.get<Comment[]>('/comments/', {
            //     params: {
            //         articleId,
            //         _expand: 'user',
            //     },
            // });

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
