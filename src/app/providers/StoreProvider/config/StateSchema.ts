import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { ScrollSaveSchema } from 'features/ScrollSave';
import { addCommentFormSchema } from 'features/addNewComment';
import { ArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
    counter: CounterSchema,
    user: UserSchema,
    scrollSave: ScrollSaveSchema,
    // Асинхронные редьюсеры
    loginForm?: LoginSchema,
    profile?: ProfileSchema,
    articleDetails?: ArticleDetailsSchema,
    articleDetailsComments?: ArticleDetailsCommentsSchema,
    addNewCommentForm?: addCommentFormSchema,
    articlesPage?: ArticlesPageSchema,
}

export type StateShchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateShchemaKey, boolean>;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateShchemaKey, reducer: Reducer) => void;
    remove: (key: StateShchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
