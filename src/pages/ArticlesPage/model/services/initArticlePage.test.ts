import { TestAsyncThunk } from '@/shared/libs/tests/TestAsyncThunk/TestAsyncThunk';

// import { fetchArticlesList } from './fetchArticlesList';
import { initArticlePage } from './initArticlePage';

jest.mock('./fetchArticlesList');

const urlParams = new URLSearchParams({
    order: '',
    search: '',
    sort: '',
    type: '',
});

describe('fetchNextArticlesPage.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(initArticlePage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 4,
                _inited: false,
            },
        });

        await thunk.callThunk(urlParams);

        expect(thunk.dispatch).toBeCalledTimes(3);
        // expect(fetchArticlesList).toHaveBeenCalledWith({});
    });
    test('fetchAritcleList not called', async () => {
        const thunk = new TestAsyncThunk(initArticlePage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 4,
                _inited: true,
            },
        });

        await thunk.callThunk(urlParams);

        expect(thunk.dispatch).toBeCalledTimes(2);
        // expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
