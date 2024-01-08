import {
    CombinedState,
    Reducer,
    ReducersMapObject,
    configureStore,
} from '@reduxjs/toolkit';

import { ScrollSaveReducer } from '@/features/ScrollSave';
import { articleRatingApi } from '@/features/articleRating';
import { recommendationsApi } from '@/features/articleRecommendationsList';
import { profileRatingApi } from '@/features/profileRating';

import { counterReducer } from '@/entities/Counter';
import { notificationApi } from '@/entities/Notification';
import { userReducer } from '@/entities/User';

import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        scrollSave: ScrollSaveReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
        [profileRatingApi.reducerPath]: profileRatingApi.reducer,
        [notificationApi.reducerPath]: notificationApi.reducer,
        [articleRatingApi.reducerPath]: articleRatingApi.reducer,
        [recommendationsApi.reducerPath]: recommendationsApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(
                rtkApi.middleware,
                profileRatingApi.middleware,
                notificationApi.middleware,
                articleRatingApi.middleware,
                recommendationsApi.middleware,
            ),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
