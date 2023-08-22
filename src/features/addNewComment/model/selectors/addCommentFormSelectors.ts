import { StateSchema } from 'app/providers/StoreProvider';

export const getAddCommentFormText = (state: StateSchema) => state.addNewCommentForm?.text ?? '';
export const getAddCommentFormError = (state: StateSchema) => state.addNewCommentForm?.error;
