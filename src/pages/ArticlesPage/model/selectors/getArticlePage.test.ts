import { StateSchema } from '@/app/providers/StoreProvider';

import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article';

import {
    getArticlesPageError,
    getArticlesPageHasMore,
    getArticlesPageInited,
    getArticlesPageIsLoading,
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from './getArticlesPage';

describe('ArticlesPage.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                error: 'error',
            },
        };
        expect(getArticlesPageError(state as StateSchema)).toEqual('error');
    });
    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageError(state as StateSchema)).toEqual(undefined);
    });
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                isLoading: true,
            },
        };
        expect(getArticlesPageIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should work with empty state isLoading', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageIsLoading(state as StateSchema)).toEqual(false);
    });
    test('should return view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                view: ArticleView.LIST,
            },
        };
        expect(getArticlesPageView(state as StateSchema)).toEqual(
            ArticleView.LIST,
        );
    });
    test('should work with empty state view', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageView(state as StateSchema)).toEqual(
            ArticleView.GRID,
        );
    });
    test('should return page', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                page: 2,
            },
        };
        expect(getArticlesPageNum(state as StateSchema)).toEqual(2);
    });
    test('should work with empty state page', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageNum(state as StateSchema)).toEqual(1);
    });
    test('should return limit', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                limit: 4,
            },
        };
        expect(getArticlesPageLimit(state as StateSchema)).toEqual(4);
    });
    test('should work with empty state limit', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageLimit(state as StateSchema)).toEqual(9);
    });
    test('should return hasMore', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                hasMore: true,
            },
        };
        expect(getArticlesPageHasMore(state as StateSchema)).toEqual(true);
    });
    test('should work with empty state hasMore', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageHasMore(state as StateSchema)).toEqual(undefined);
    });
    test('should return inited', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                _inited: true,
            },
        };
        expect(getArticlesPageInited(state as StateSchema)).toEqual(true);
    });
    test('should work with empty state inited', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageInited(state as StateSchema)).toEqual(undefined);
    });
    test('should return order', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                order: 'desc',
            },
        };
        expect(getArticlesPageOrder(state as StateSchema)).toEqual('desc');
    });
    test('should work with empty state order', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageOrder(state as StateSchema)).toEqual('asc');
    });
    test('should return sort', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                sort: ArticleSortField.VIEWS,
            },
        };
        expect(getArticlesPageSort(state as StateSchema)).toEqual(
            ArticleSortField.VIEWS,
        );
    });
    test('should work with empty state sort', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageSort(state as StateSchema)).toEqual(
            ArticleSortField.CREATED,
        );
    });
    test('should return search', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                search: 'abc',
            },
        };
        expect(getArticlesPageSearch(state as StateSchema)).toEqual('abc');
    });
    test('should work with empty state search', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageSearch(state as StateSchema)).toEqual('');
    });
    test('should return type', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                type: ArticleType.IT,
            },
        };
        expect(getArticlesPageType(state as StateSchema)).toEqual(
            ArticleType.IT,
        );
    });
    test('should work with empty state type', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticlesPageType(state as StateSchema)).toEqual(
            ArticleType.ALL,
        );
    });
});
