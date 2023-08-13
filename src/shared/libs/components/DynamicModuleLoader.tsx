import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateShchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StateShchemaKey]?: Reducer;
}
interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children, reducers, removeAfterUnmount = true,
    } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateShchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
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
        <>
            {children}
        </>
    );
};
