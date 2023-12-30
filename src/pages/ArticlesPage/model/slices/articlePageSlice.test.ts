import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

import { fetchArticlesList } from '../services/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlePageSchema';
import {
    articlesPageSliceActions,
    articlesPageSliceReducer,
} from './articlePageSlice';

const data = [
    {
        id: '1',
        title: 'Javascript news',
        subtitle: 'Что нового в JS за 2022 год',
        img: 'https://play-lh.googleusercontent.com/IHMe-gJ6G4rf5-TVlDZOtcW-3EDBwJ4p2qomk86O6qkjjutl5ePczGmyqCDOvhGJ1w=w240-h480-rw',
        views: 997,
        createdAt: '26.02.2022',
        type: [ArticleType.IT],
        user: {
            email: 'abc',
            token: '123',
            id: '1',
            username: 'Admin',
            avatar: 'https://i.pinimg.com/originals/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg',
        },
        blocks: [],
    },
];

const dataObj = data.find((obj) => obj.id === '1');

describe('articlePageSlice', () => {
    test('test set view', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            view: ArticleView.LIST,
        };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                articlesPageSliceActions.setView(ArticleView.GRID),
            ),
        ).toEqual({ view: ArticleView.GRID });
    });
    test('test set page', () => {
        const state: DeepPartial<ArticlesPageSchema> = { page: 1 };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                articlesPageSliceActions.setPage(2),
            ),
        ).toEqual({ page: 2 });
    });
    test('test set order', () => {
        const state: DeepPartial<ArticlesPageSchema> = { order: 'asc' };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                articlesPageSliceActions.setOrder('desc'),
            ),
        ).toEqual({ order: 'desc' });
    });
    test('test set sort', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            sort: ArticleSortField.CREATED,
        };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                articlesPageSliceActions.setSort(ArticleSortField.VIEWS),
            ),
        ).toEqual({ sort: ArticleSortField.VIEWS });
    });
    test('test set limit', () => {
        const state: DeepPartial<ArticlesPageSchema> = { limit: 4 };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                articlesPageSliceActions.setLimit(9),
            ),
        ).toEqual({ limit: 9 });
    });
    test('test set type', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            type: ArticleType.ALL,
        };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                articlesPageSliceActions.setType(ArticleType.IT),
            ),
        ).toEqual({ type: ArticleType.IT });
    });

    test('test fetchArticlesPage pending with replace', () => {
        const state: DeepPartial<ArticlesPageSchema> = { isLoading: false };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.pending('1', { replace: true }),
            ),
        ).toEqual({
            entities: {},
            error: undefined,
            ids: [],
            isLoading: true,
        });
    });

    test('test fetchArticlesPage pending without replace', () => {
        const state: DeepPartial<ArticlesPageSchema> = { isLoading: false };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.pending('1', { replace: false }),
            ),
        ).toEqual({
            error: undefined,
            isLoading: true,
        });
    });

    test('test fetchArticlesPage fulfilled with replace', () => {
        const state: DeepPartial<ArticlesPageSchema> = { isLoading: true };
        expect(
            articlesPageSliceReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.fulfilled(data, '1', { replace: true }),
            ),
        ).toEqual({
            entities: {
                1: dataObj,
            },
            hasMore: false,
            ids: ['1'],
            isLoading: false,
        });
    });
});
