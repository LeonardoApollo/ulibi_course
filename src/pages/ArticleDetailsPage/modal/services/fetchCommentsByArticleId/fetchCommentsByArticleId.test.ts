import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

import { TestAsyncThunk } from '@/shared/libs/tests/TestAsyncThunk/TestAsyncThunk';

const data = {
    id: '1',
    text: 'lorem ipsum',
    user: { id: '1', username: 'Admin' },
};

describe('fetchCommentsByArticleId', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });
    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
