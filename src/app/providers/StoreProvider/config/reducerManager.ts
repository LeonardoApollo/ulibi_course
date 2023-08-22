import {
    AnyAction, Reducer, ReducersMapObject, combineReducers,
} from '@reduxjs/toolkit';
import {
    MountedReducers, ReducerManager, StateSchema, StateShchemaKey,
} from './StateSchema';

export function createReducerManager(initialReducer: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = { ...initialReducer };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: Array<StateShchemaKey> = [];

    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        add: (key: StateShchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            mountedReducers[key] = true;
            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateShchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            mountedReducers[key] = false;
            combinedReducer = combineReducers(reducers);
        },
    };
}
