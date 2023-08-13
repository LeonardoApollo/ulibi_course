import { addCommentFormSchema } from '../types/addNewCommentForm';
import { addNewCommentFormActions, addNewCommentFormReducer } from './addNewCommentSlice';

describe('addNewCommentSlice', () => {
    test('test set text', () => {
        const state: DeepPartial<addCommentFormSchema> = { text: '' };
        expect(addNewCommentFormReducer(
            state as addCommentFormSchema,
            addNewCommentFormActions.setText('lorem ipsum'),
        )).toEqual({ text: 'lorem ipsum' });
    });
});
