import type {
    StateSchema, ReduxStoreWithManager, ThunkConfig, StateShchemaKey,
} from './config/StateSchema';
import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
    StoreProvider,
    createReduxStore,
};
export type {
    StateSchema,
    ReduxStoreWithManager,
    AppDispatch,
    ThunkConfig,
    StateShchemaKey,
};
