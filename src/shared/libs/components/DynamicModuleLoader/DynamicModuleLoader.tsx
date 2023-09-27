import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import {
    ReduxStoreWithManager,
    StateSchema,
    StateShchemaKey,
} from '@/app/providers/StoreProvider';

export type ReducersList = {
    [name in StateShchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};
interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const { children, reducers, removeAfterUnmount = true } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateShchemaKey];
            // Добавляем новый редьюсер только если его нет
            if (!mounted) {
                store.reducerManager.add(name as StateShchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });
        return () => {
            Object.entries(reducers).forEach(([name]) => {
                if (removeAfterUnmount) {
                    store.reducerManager.remove(name as StateShchemaKey);
                    dispatch({ type: `@DELETE ${name} reducer` });
                }
            });
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line
        <>{children}</>
    );
};
