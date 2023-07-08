import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';

export interface StateSchema {
    counter: CounterSchema,
    user: UserSchema,

    // Асинхронные редьюсеры
    loginForm?: LoginSchema,
    profile?: ProfileSchema,
}

export type StateShchemaKey = keyof StateSchema;

export interface RedcerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateShchemaKey, reducer: Reducer) => void;
    remove: (key: StateShchemaKey) => void;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: RedcerManager;
}
