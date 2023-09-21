import { getAddCommentFormText, getAddCommentFormError } from './addCommentFormSelectors';

import { StateSchema } from '@/app/providers/StoreProvider';

describe('addCommentSelector.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addNewCommentForm: {
                error: 'error',
            },
        };
        expect(getAddCommentFormError(state as StateSchema)).toEqual('error');
    });
    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormError(state as StateSchema)).toEqual(undefined);
    });
    test('should return text', () => {
        const state: DeepPartial<StateSchema> = {
            addNewCommentForm: {
                text: 'lorem ipsum',
            },
        };
        expect(getAddCommentFormText(state as StateSchema)).toEqual('lorem ipsum');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getAddCommentFormText(state as StateSchema)).toEqual('');
    });
});
