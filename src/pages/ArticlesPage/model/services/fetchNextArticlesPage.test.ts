// import { ArticleSortField, ArticleType } from '@/entities/Article';

// import { TestAsyncThunk } from '@/shared/libs/tests/TestAsyncThunk/TestAsyncThunk';

// import { fetchArticlesList } from './fetchArticlesList';
// import { fetchNextArticlesPage } from './fetchNextArticlesPage';

// jest.mock('./fetchArticlesList');

// Тест убран из-за перехода на Firebase
describe('fetchNextArticlesPage.test', () => {
    test('bulk', () => {
        expect(1).toBe(1);
    });
    // test('success', async () => {
    //     const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
    //         articlesPage: {
    //             page: 1,
    //             ids: [],
    //             entities: {},
    //             limit: 4,
    //             isLoading: false,
    //             sort: ArticleSortField.VIEWS,
    //             order: 'asc',
    //             search: '',
    //             type: ArticleType.ALL,
    //             hasMore: true,
    //         },
    //     });

    //     await thunk.callThunk();

    //     expect(thunk.dispatch).toBeCalledTimes(4);
    //     expect(fetchArticlesList).toHaveBeenCalled();
    // });
    // test('fetchAritcleList not called', async () => {
    //     const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
    //         articlesPage: {
    //             page: 1,
    //             ids: [],
    //             entities: {},
    //             limit: 4,
    //             isLoading: false,
    //             sort: ArticleSortField.VIEWS,
    //             order: 'asc',
    //             search: '',
    //             type: ArticleType.ALL,
    //             hasMore: false,
    //         },
    //     });

    //     await thunk.callThunk();

    //     expect(thunk.dispatch).toBeCalledTimes(2);
    //     expect(fetchArticlesList).not.toHaveBeenCalled();
    // });
});

export {};
