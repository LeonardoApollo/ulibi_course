import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    Article,
    ArticleBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
    ArticleType,
} from '@/entities/Article';
import { User } from '@/entities/User';

import { createArticle } from '../services/createArticle';
import { deleteArticle } from '../services/deleteArticle';
import { fetchEditArticleData } from '../services/fetchEditArticle';
import { updateArticleData } from '../services/updateArticles';
import { ArticleEditFormSchema } from '../types/articleEditFormSchema';

const initialState: ArticleEditFormSchema = {
    isLoading: false,
    title: '',
    subtitle: '',
    img: '',
    createdAt: '',
    views: 0,
    type: [],
    blocks: [],
};

export const articleEditFormSlice = createSlice({
    name: 'articleEditFormSlice',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setSubtitle: (state, action: PayloadAction<string>) => {
            state.subtitle = action.payload;
        },
        setImage: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        },
        setCreatedAt: (state, action: PayloadAction<string>) => {
            state.createdAt = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        addType: (
            state,
            action: PayloadAction<
                ArticleType.IT | ArticleType.ECONOMIC | ArticleType.SCIENCE
            >,
        ) => {
            state.type = [...state.type, action.payload];
        },
        deleteType: (
            state,
            action: PayloadAction<
                ArticleType.IT | ArticleType.ECONOMIC | ArticleType.SCIENCE
            >,
        ) => {
            state.type = state.type.filter((tag) => tag !== action.payload);
        },
        addBlock: (state, action: PayloadAction<ArticleBlock>) => {
            state.blocks = [...state.blocks, action.payload];
        },
        deleteBlock: (state, action: PayloadAction<ArticleBlock>) => {
            state.blocks = state.blocks.filter(
                (block) => block.id !== action.payload.id,
            );
        },
        updateCodeBlock: (state, action: PayloadAction<ArticleCodeBlock>) => {
            state.blocks = state.blocks.map((block) => {
                if (block.id === action.payload.id) {
                    return action.payload;
                }
                return block;
            });
        },
        updateImageBlock: (state, action: PayloadAction<ArticleImageBlock>) => {
            state.blocks = state.blocks.map((block) => {
                if (block.id === action.payload.id) {
                    return action.payload;
                }
                return block;
            });
        },
        updateTextBlock: (state, action: PayloadAction<ArticleTextBlock>) => {
            state.blocks = state.blocks.map((block) => {
                if (block.id === action.payload.id) {
                    return action.payload;
                }
                return block;
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEditArticleData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchEditArticleData.fulfilled,
                (state, { payload }: PayloadAction<Article>) => {
                    state.id = payload.id;
                    state.title = payload.title;
                    state.subtitle = payload.subtitle;
                    state.user = payload.user;
                    state.img = payload.img;
                    state.createdAt = payload.createdAt;
                    state.views = payload.views;
                    state.type = payload.type;
                    state.blocks = payload.blocks;
                    state.isLoading = false;
                },
            )
            .addCase(fetchEditArticleData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateArticleData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateArticleData.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateArticleData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createArticle.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteArticle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteArticle.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleEditFormSliceActions } = articleEditFormSlice;
export const { reducer: articleEditFormSliceReducer } = articleEditFormSlice;
