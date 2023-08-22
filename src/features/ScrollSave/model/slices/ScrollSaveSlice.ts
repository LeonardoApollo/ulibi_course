import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScrollSaveSchema } from '../types/ScrollSaveSchema';

const initialState: ScrollSaveSchema = {
    scroll: {},
};

export const ScrollSave = createSlice({
    name: 'ScrollSaveSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { actions: ScrollSaveActions } = ScrollSave;
export const { reducer: ScrollSaveReducer } = ScrollSave;
