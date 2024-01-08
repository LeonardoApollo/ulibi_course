import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    DocumentReference,
    collection,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where,
} from 'firebase/firestore';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '@/entities/Article';
import { User } from '@/entities/User';

import { db } from '@/shared/config/firebase/firebase';
import { addQueryParams } from '@/shared/libs/url/addQueryParams/addQueryParams';

import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../selectors/getArticlesPage';

interface FetchArticlesListProps {
    replace?: boolean;
    next?: boolean;
}

let lastVisible: any;

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async ({ next = false }, { extra, rejectWithValue, getState }) => {
        const qLimit = getArticlesPageLimit(getState());
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const search = getArticlesPageSearch(getState());
        const page = getArticlesPageNum(getState());
        const type = getArticlesPageType(getState());
        const validatedSearch = search.trim().toLocaleLowerCase();
        try {
            const articles: Article[] = [];
            addQueryParams({
                sort,
                order,
                search,
                type,
            });
            const articlesRef = collection(db, 'articles');
            const articlesQuery = query(
                articlesRef,
                orderBy(sort, order),
                search
                    ? where('nameIndex', 'array-contains', validatedSearch)
                    : where('type', 'array-contains', type),
                limit(qLimit),
            );
            const aritclesSnapshot = await getDocs(articlesQuery);
            if (page === 1 && !next) {
                lastVisible =
                    aritclesSnapshot.docs[aritclesSnapshot.docs.length - 1];
            }
            if (next) {
                const next = query(
                    articlesRef,
                    orderBy(sort, order),
                    search
                        ? where('nameIndex', 'array-contains', validatedSearch)
                        : where('type', 'array-contains', type),
                    startAfter(lastVisible),
                    limit(qLimit),
                );
                const nextSnapshot = await getDocs(next);
                if (!search) {
                    lastVisible =
                        nextSnapshot.docs[nextSnapshot.docs.length - 1];
                }
                nextSnapshot.forEach((document) => {
                    const data = document.data();
                    if (search) {
                        const dataSet = new Set(data!.type);
                        if (dataSet.has(type)) {
                            lastVisible = document;
                            articles.push({
                                id: document.id,
                                user: data!.user,
                                title: data!.title,
                                subtitle: data!.subtitle,
                                img: data!.img,
                                views: data!.views,
                                createdAt: data!.createdAt,
                                type: data!.type,
                                blocks: data!.blocks,
                            });
                        }
                    } else {
                        articles.push({
                            id: document.id,
                            user: data!.user,
                            title: data!.title,
                            subtitle: data!.subtitle,
                            img: data!.img,
                            views: data!.views,
                            createdAt: data!.createdAt,
                            type: data!.type,
                            blocks: data!.blocks,
                        });
                    }
                });
            } else {
                aritclesSnapshot.forEach((document) => {
                    const data = document.data();
                    if (search) {
                        const dataSet = new Set(data!.type);
                        if (dataSet.has(type)) {
                            lastVisible = document;
                            articles.push({
                                id: document.id,
                                user: data!.user,
                                title: data!.title,
                                subtitle: data!.subtitle,
                                img: data!.img,
                                views: data!.views,
                                createdAt: data!.createdAt,
                                type: data!.type,
                                blocks: data!.blocks,
                            });
                        }
                    } else {
                        articles.push({
                            id: document.id,
                            user: data!.user,
                            title: data!.title,
                            subtitle: data!.subtitle,
                            img: data!.img,
                            views: data!.views,
                            createdAt: data!.createdAt,
                            type: data!.type,
                            blocks: data!.blocks,
                        });
                    }
                });
            }
            // eslint-disable-next-line
            for await (const article of articles) {
                const userSnap = await getDoc(
                    article.user as any as DocumentReference,
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
                article.user = user;
            }
            return articles;
            // const response = await extra.api.get<Article[]>('/articles', {
            //     params: {
            //         _expand: 'user',
            //         _limit: qLimit,
            //         _page: page,
            //         _sort: sort,
            //         _order: order,
            //         q: search,
            //         type_like: type === ArticleType.ALL ? undefined : type,
            //     },
            // });

            // if (!response.data) {
            //     throw new Error();
            // }

            // return response.data;
        } catch (error) {
            const e = error as Error;
            console.log(e);
            return rejectWithValue(`${e.message}`);
        }
    },
);
