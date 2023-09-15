import { TestAsyncThunk } from '@/shared/libs/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from './fetchArticlesList';

jest.mock('./fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 1,
                ids: [],
                entities: {},
                limit: 4,
                isLoading: false,
                sort: ArticleSortField.VIEWS,
                order: 'asc',
                search: '',
                type: ArticleType.ALL,
                hasMore: true,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toHaveBeenCalled();
    });
    test('fetchAritcleList not called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                page: 1,
                ids: [],
                entities: {},
                limit: 4,
                isLoading: false,
                sort: ArticleSortField.VIEWS,
                order: 'asc',
                search: '',
                type: ArticleType.ALL,
                hasMore: false,
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
