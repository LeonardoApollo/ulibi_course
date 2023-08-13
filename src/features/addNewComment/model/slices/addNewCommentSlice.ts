import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addCommentFormSchema } from '../types/addNewCommentForm';

const initialState: addCommentFormSchema = {
    text: '',
    error: undefined,
};

export const addNewCommentFormSlice = createSlice({
    name: 'addNewCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: addNewCommentFormActions } = addNewCommentFormSlice;
export const { reducer: addNewCommentFormReducer } = addNewCommentFormSlice;
